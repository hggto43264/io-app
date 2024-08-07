import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/function";
import _ from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistConfig, persistReducer } from "redux-persist";
import { getType } from "typesafe-actions";
import { differentProfileLoggedIn } from "../../../../../store/actions/crossSessions";
import { clearCache } from "../../../../../store/actions/profile";
import { Action } from "../../../../../store/actions/types";
import { getLookUpId } from "../../../../../utils/pmLookUpId";
import {
  paymentsCalculatePaymentFeesAction,
  paymentsCreateTransactionAction,
  paymentsGetPaymentDetailsAction,
  paymentsGetPaymentTransactionInfoAction,
  paymentsGetPaymentUserMethodsAction
} from "../../../checkout/store/actions/networking";
import {
  initPaymentStateAction,
  selectPaymentMethodAction,
  selectPaymentPspAction
} from "../../../checkout/store/actions/orchestration";
import { WalletPaymentFailure } from "../../../checkout/types/WalletPaymentFailure";
import { PaymentHistory } from "../../types";
import {
  storeNewPaymentAttemptAction,
  storePaymentOutcomeToHistory
} from "../actions";
import { RptId } from "../../../../../../definitions/pagopa/ecommerce/RptId";
import { getPaymentsWalletUserMethods } from "../../../wallet/store/actions";
import { getPspFlagType } from "../../../checkout/utils";
import {
  centsToAmount,
  formatNumberAmount
} from "../../../../../utils/stringBuilder";
import { PaymentAnalyticsData } from "../../../checkout/types/PaymentAnalytics";

export type PaymentsHistoryState = {
  analyticsData?: PaymentAnalyticsData;
  ongoingPayment?: PaymentHistory;
  archive: ReadonlyArray<PaymentHistory>;
};

const INITIAL_STATE: PaymentsHistoryState = {
  archive: []
};

export const ARCHIVE_SIZE = 15;

const reducer = (
  state: PaymentsHistoryState = INITIAL_STATE,
  action: Action
): PaymentsHistoryState => {
  switch (action.type) {
    case getType(initPaymentStateAction):
      return {
        ...state,
        analyticsData: {
          savedPaymentMethods: state.analyticsData?.savedPaymentMethods,
          startOrigin: action.payload.startOrigin,
          serviceName: action.payload.serviceName
        },
        ongoingPayment: {
          startOrigin: action.payload.startOrigin,
          startedAt: new Date(),
          lookupId: getLookUpId()
        }
      };
    case getType(paymentsGetPaymentDetailsAction.request):
      return {
        ...state,
        analyticsData: {
          ...state.analyticsData,
          attempt: getPaymentAttemptByRptId(state, action.payload)
        },
        ongoingPayment: {
          ...state.ongoingPayment,
          rptId: action.payload,
          attempt: getPaymentAttemptByRptId(state, action.payload)
        }
      };
    case getType(paymentsGetPaymentDetailsAction.success):
      return {
        ...state,
        analyticsData: {
          ...state.analyticsData,
          verifiedData: action.payload,
          formattedAmount: formatNumberAmount(
            centsToAmount(action.payload.amount),
            true,
            "right"
          )
        },
        ongoingPayment: {
          ...state.ongoingPayment,
          verifiedData: action.payload
        }
      };
    case getType(storeNewPaymentAttemptAction):
      return updatePaymentHistory(state, {}, true);
    case getType(paymentsCreateTransactionAction.success):
    case getType(paymentsGetPaymentTransactionInfoAction.success):
      return updatePaymentHistory(state, {
        transaction: action.payload
      });
    case getType(storePaymentOutcomeToHistory):
      return updatePaymentHistory(state, {
        outcome: action.payload,
        ...(action.payload === "0" ? { success: true } : {})
      });
    case getType(paymentsGetPaymentDetailsAction.failure):
    case getType(paymentsCreateTransactionAction.failure):
    case getType(paymentsGetPaymentTransactionInfoAction.failure):
      return updatePaymentHistory(state, {
        failure: pipe(
          WalletPaymentFailure.decode(action.payload),
          O.fromEither,
          O.toUndefined
        )
      });
    case getType(selectPaymentMethodAction):
      const paymentMethodName =
        action.payload.userWallet?.details?.type ||
        action.payload.paymentMethod?.name;
      return {
        ...state,
        analyticsData: {
          ...state.analyticsData,
          selectedPaymentMethod: paymentMethodName
        }
      };
    case getType(paymentsGetPaymentUserMethodsAction.success):
    case getType(getPaymentsWalletUserMethods.success):
      const unavailablePaymentMethods = action.payload.wallets?.filter(wallet =>
        wallet.applications.find(
          app => app.name === "PAGOPA" && app.status !== "ENABLED"
        )
      );
      return {
        ...state,
        analyticsData: {
          ...state.analyticsData,
          savedPaymentMethods: action.payload.wallets,
          savedPaymentMethodsUnavailable: unavailablePaymentMethods
        }
      };
    case getType(paymentsCalculatePaymentFeesAction.success):
      return {
        ...state,
        analyticsData: {
          ...state.analyticsData,
          selectedPsp: undefined,
          pspList: action.payload.bundles
        }
      };
    case getType(selectPaymentPspAction):
      return {
        ...state,
        analyticsData: {
          ...state.analyticsData,
          selectedPsp: action.payload,
          selectedPspFlag: getPspFlagType(
            action.payload,
            state.analyticsData?.pspList
          )
        }
      };
    case getType(differentProfileLoggedIn):
    case getType(clearCache):
      return INITIAL_STATE;
  }
  return state;
};

const getPaymentAttemptByRptId = (state: PaymentsHistoryState, rptId: RptId) =>
  pipe(
    state.archive as Array<PaymentHistory>,
    A.findFirst(h => h.rptId === rptId),
    O.chainNullableK(h => h.attempt),
    O.getOrElse(() => 0)
  );

const appendItemToArchive = (
  archive: ReadonlyArray<PaymentHistory>,
  item: PaymentHistory
): ReadonlyArray<PaymentHistory> =>
  pipe(
    archive,
    // Remove previous entry if already exists
    a => a.filter(({ rptId }) => !_.isEqual(rptId, item.rptId)),
    // Keep only the latest ARCHIVE_SIZE - 1 entries
    a => a.slice(-ARCHIVE_SIZE + 1),
    // Add the new entry to the archive
    a => [...a, item]
  );

const updatePaymentHistory = (
  state: PaymentsHistoryState,
  data: PaymentHistory,
  newAttempt: boolean = false
): PaymentsHistoryState => {
  const currentAttempt = state.ongoingPayment?.attempt || 0;
  const updatedOngoingPaymentHistory: PaymentHistory = {
    ...state.ongoingPayment,
    ...data,
    attempt: newAttempt ? currentAttempt + 1 : currentAttempt
  };

  if (newAttempt) {
    return {
      ongoingPayment: updatedOngoingPaymentHistory,
      archive: appendItemToArchive(state.archive, updatedOngoingPaymentHistory)
    };
  }

  return {
    ongoingPayment: updatedOngoingPaymentHistory,
    archive: [..._.dropRight(state.archive), updatedOngoingPaymentHistory]
  };
};

const CURRENT_REDUX_PAYMENT_HISTORY_STORE_VERSION = -1;

const persistConfig: PersistConfig = {
  key: "paymentHistory",
  storage: AsyncStorage,
  version: CURRENT_REDUX_PAYMENT_HISTORY_STORE_VERSION,
  whitelist: ["archive"]
};

export const walletPaymentHistoryPersistor = persistReducer<
  PaymentsHistoryState,
  Action
>(persistConfig, reducer);

export default walletPaymentHistoryPersistor;
