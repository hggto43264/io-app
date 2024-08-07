import { RouteProp, useRoute } from "@react-navigation/native";
import { useSelector } from "@xstate/react";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { ButtonSolid, VSpacer } from "@pagopa/io-app-design-system";
import ItemSeparatorComponent from "../../../../components/ItemSeparatorComponent";
import { ForceScrollDownView } from "../../../../components/ForceScrollDownView";
import I18n from "../../../../i18n";
import { emptyContextualHelp } from "../../../../utils/emptyContextualHelp";
import {
  OnboardingDescriptionMarkdown,
  OnboardingDescriptionMarkdownSkeleton
} from "../components/OnboardingDescriptionMarkdown";
import { OnboardingPrivacyAdvice } from "../components/OnboardingPrivacyAdvice";
import { OnboardingServiceHeader } from "../components/OnboardingServiceHeader";
import { IDPayOnboardingParamsList } from "../navigation/navigator";
import { useOnboardingMachineService } from "../xstate/provider";
import { isUpsertingSelector, selectInitiative } from "../xstate/selectors";
import { useHeaderSecondLevel } from "../../../../hooks/useHeaderSecondLevel";

type InitiativeDetailsScreenRouteParams = {
  serviceId: string;
};

type InitiativeDetailsRouteProps = RouteProp<
  IDPayOnboardingParamsList,
  "IDPAY_ONBOARDING_INITIATIVE_DETAILS"
>;

const InitiativeDetailsScreen = () => {
  const route = useRoute<InitiativeDetailsRouteProps>();
  const machine = useOnboardingMachineService();

  const { serviceId } = route.params;

  React.useEffect(() => {
    machine.send({
      type: "SELECT_INITIATIVE",
      serviceId
    });
  }, [machine, serviceId]);

  const initiative = useSelector(machine, selectInitiative);
  const isUpserting = useSelector(machine, isUpsertingSelector);
  const [isDescriptionLoaded, setDescriptionLoaded] = React.useState(false);

  const handleGoBackPress = () => machine.send({ type: "QUIT_ONBOARDING" });

  const handleContinuePress = () => machine.send({ type: "ACCEPT_TOS" });

  const onboardingPrivacyAdvice = pipe(
    initiative,
    O.fromNullable,
    O.map(initiative => ({
      privacyUrl: initiative.privacyLink,
      tosUrl: initiative.tcLink
    })),
    O.fold(
      () => null,
      props => <OnboardingPrivacyAdvice {...props} />
    )
  );

  const descriptionComponent = pipe(
    initiative,
    O.fromNullable,
    O.fold(
      () => <OnboardingDescriptionMarkdownSkeleton />,
      ({ description }) => (
        <OnboardingDescriptionMarkdown
          onLoadEnd={() => setDescriptionLoaded(true)}
          description={description}
        />
      )
    )
  );

  useHeaderSecondLevel({
    title: I18n.t("idpay.onboarding.headerTitle"),
    contextualHelp: emptyContextualHelp,
    goBack: handleGoBackPress,
    supportRequest: true
  });

  return (
    <ForceScrollDownView
      threshold={150}
      scrollEnabled={isDescriptionLoaded}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.container}>
        <VSpacer size={24} />
        <OnboardingServiceHeader initiative={initiative} />
        <VSpacer size={24} />
        {descriptionComponent}
        <VSpacer size={8} />
        <ItemSeparatorComponent noPadded={true} />
        <VSpacer size={16} />
        {onboardingPrivacyAdvice}
        <VSpacer size={32} />
        <ButtonSolid
          testID="IDPayOnboardingContinue"
          key={"continue"}
          label={I18n.t("global.buttons.continue")}
          onPress={handleContinuePress}
          loading={isUpserting}
          disabled={isUpserting}
          fullWidth
        />
        <VSpacer size={48} />
      </View>
    </ForceScrollDownView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24
  }
});

export type { InitiativeDetailsScreenRouteParams };

export default InitiativeDetailsScreen;
