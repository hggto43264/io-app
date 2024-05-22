import {
  Divider,
  IOVisualCostants,
  ListItemInfo,
  VSpacer
} from "@pagopa/io-app-design-system";
import * as pot from "@pagopa/ts-commons/lib/pot";
import React, { useEffect } from "react";
import {
  AppState,
  FlatList,
  ListRenderItemInfo,
  Platform,
  SafeAreaView,
  View
} from "react-native";
import { useSelector } from "react-redux";
import { FooterStackButton } from "../../../components/buttons/FooterStackButtons";
import { Body } from "../../../components/core/typography/Body";
import { H1 } from "../../../components/core/typography/H1";
import { H2 } from "../../../components/core/typography/H2";
import { IOStyles } from "../../../components/core/variables/IOStyles";
import BaseScreenComponent, {
  ContextualHelpPropsMarkdown
} from "../../../components/screens/BaseScreenComponent";
import I18n from "../../../i18n";
import { notificationsInfoScreenConsent } from "../store/actions/notifications";
import { useIODispatch } from "../../../store/hooks";
import { profilePreferencesSelector } from "../../../store/reducers/profile";
import {
  trackNotificationsOptInOpenSettings,
  trackNotificationsOptInReminderOnPermissionsOff,
  trackNotificationsOptInSkipSystemPermissions
} from "../analytics";
import { openAppSettings } from "../../../utils/appSettings";
import { checkNotificationPermissions } from "../utils";

const contextualHelpMarkdown: ContextualHelpPropsMarkdown = {
  title: "onboarding.infoConsent.contextualHelpTitle",
  body: "onboarding.infoConsent.contextualHelpContent"
};

const instructions = Platform.select<ReadonlyArray<ListItemInfo>>({
  ios: [
    {
      icon: "systemSettingsiOS",
      label: I18n.t("onboarding.infoConsent.instructions.label"),
      value: I18n.t("onboarding.infoConsent.instructions.ios.step1"),
      accessibilityLabel: I18n.t(
        "onboarding.infoConsent.instructions.ios.step1"
      )
    },
    {
      icon: "systemNotificationsInstructions",
      label: I18n.t("onboarding.infoConsent.instructions.label"),
      value: I18n.t("onboarding.infoConsent.instructions.ios.step2"),
      accessibilityLabel: I18n.t(
        "onboarding.infoConsent.instructions.ios.step2"
      )
    },
    {
      icon: "systemToggleInstructions",
      label: I18n.t("onboarding.infoConsent.instructions.label"),
      value: I18n.t("onboarding.infoConsent.instructions.ios.step3"),
      accessibilityLabel: I18n.t(
        "onboarding.infoConsent.instructions.ios.step3"
      )
    }
  ],
  android: [
    {
      icon: "systemSettingsAndroid",
      label: I18n.t("onboarding.infoConsent.instructions.label"),
      value: I18n.t("onboarding.infoConsent.instructions.android.step1"),
      accessibilityLabel: I18n.t(
        "onboarding.infoConsent.instructions.android.step1"
      )
    },
    {
      icon: "systemAppsAndroid",
      label: I18n.t("onboarding.infoConsent.instructions.label"),
      value: I18n.t("onboarding.infoConsent.instructions.android.step2"),
      accessibilityLabel: I18n.t(
        "onboarding.infoConsent.instructions.android.step2"
      )
    },
    {
      icon: "productIOAppBlueBg",
      label: I18n.t("onboarding.infoConsent.instructions.label"),
      value: I18n.t("onboarding.infoConsent.instructions.android.step3"),
      accessibilityLabel: I18n.t(
        "onboarding.infoConsent.instructions.android.step3"
      )
    },
    {
      icon: "systemNotificationsInstructions",
      label: I18n.t("onboarding.infoConsent.instructions.label"),
      value: I18n.t("onboarding.infoConsent.instructions.android.step4"),
      accessibilityLabel: I18n.t(
        "onboarding.infoConsent.instructions.android.step4"
      )
    },
    {
      icon: "systemToggleInstructions",
      label: I18n.t("onboarding.infoConsent.instructions.label"),
      value: I18n.t("onboarding.infoConsent.instructions.android.step5"),
      accessibilityLabel: I18n.t(
        "onboarding.infoConsent.instructions.android.step5"
      )
    }
  ]
});

export const OnboardingNotificationsInfoScreenConsent = () => {
  const dispatch = useIODispatch();
  const optInPreferencesPot = useSelector(profilePreferencesSelector);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async nextAppState => {
        if (nextAppState === "active") {
          const authorizationStatus = await checkNotificationPermissions();

          if (authorizationStatus) {
            dispatch(notificationsInfoScreenConsent());
          }
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, [dispatch]);

  const goNext = () => {
    // When this code executes, we know for sure that system notifications permissions are disabled,
    // otherwise the component would either have been skipped by the saga or it would have automatically
    // handled the given permission using the AppState listener (registered on the useEffect)
    trackNotificationsOptInSkipSystemPermissions();

    if (pot.isSome(optInPreferencesPot)) {
      const optInPreferences = optInPreferencesPot.value;
      if (optInPreferences.preview || optInPreferences.reminder) {
        trackNotificationsOptInReminderOnPermissionsOff();
      }
    }

    dispatch(notificationsInfoScreenConsent());
  };

  const openSettings = () => {
    trackNotificationsOptInOpenSettings();
    openAppSettings();
  };

  const headerComponent = (
    <View>
      <VSpacer size={16} />
      <H1
        accessible={true}
        accessibilityRole="header"
        weight="Bold"
        color={"bluegreyDark"}
      >
        {I18n.t("onboarding.infoConsent.title")}
      </H1>
      <Body>{I18n.t("onboarding.infoConsent.subTitle")}</Body>
      <VSpacer size={24} />
      <H2 color={"bluegrey"} weight={"SemiBold"}>
        {I18n.t("onboarding.infoConsent.instructions.title")}
      </H2>
    </View>
  );

  const renderItem = ({ item, index }: ListRenderItemInfo<ListItemInfo>) => (
    <ListItemInfo {...item} label={`${item.label} ${index + 1}`} />
  );

  return (
    <BaseScreenComponent
      headerTitle={I18n.t("onboarding.infoConsent.headerTitle")}
      contextualHelpMarkdown={contextualHelpMarkdown}
      goBack={false}
      customGoBack={<View />}
    >
      <SafeAreaView style={IOStyles.flex}>
        <FlatList
          data={instructions}
          renderItem={renderItem}
          contentContainerStyle={{
            marginHorizontal: IOVisualCostants.appMarginDefault
          }}
          ItemSeparatorComponent={() => <Divider />}
          ListHeaderComponent={headerComponent}
        />
        <FooterStackButton
          primaryActionProps={{
            onPress: openSettings,
            label: I18n.t("onboarding.infoConsent.openSettings"),
            accessibilityLabel: I18n.t("onboarding.infoConsent.openSettings")
          }}
          secondaryActionProps={{
            onPress: goNext,
            label: I18n.t("onboarding.infoConsent.continue"),
            accessibilityLabel: I18n.t("onboarding.infoConsent.continue"),
            testID: "continue-btn"
          }}
        />
      </SafeAreaView>
    </BaseScreenComponent>
  );
};