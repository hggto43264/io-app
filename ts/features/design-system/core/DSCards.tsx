import {
  HSpacer,
  TabNavigation,
  TabItem,
  ContentWrapper,
  VSpacer
} from "@pagopa/io-app-design-system";
import * as React from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { CgnCard } from "../../bonus/cgn/components/CgnCard";
import { IdPayCard } from "../../idpay/wallet/components/IdPayCard";
import { PaymentCard } from "../../payments/common/components/PaymentCard";
import { PaymentCardBig } from "../../payments/common/components/PaymentCardBig";
import { PaymentCardSmall } from "../../payments/common/components/PaymentCardSmall";
import {
  PaymentCardsCarousel,
  PaymentCardsCarouselProps,
  PaymentCardsCarouselSkeleton
} from "../../payments/home/components/PaymentsCardsCarousel";
import {
  FeaturedInstitutionsCarousel,
  FeaturedInstitutionsCarouselProps,
  FeaturedInstitutionsCarouselSkeleton
} from "../../services/home/components/FeaturedInstitutionsCarousel";
import {
  FeaturedServicesCarousel,
  FeaturedServicesCarouselProps,
  FeaturedServicesCarouselSkeleton
} from "../../services/home/components/FeaturedServicesCarousel";
import { DSComponentViewerBox } from "../components/DSComponentViewerBox";
import { DesignSystemScreen } from "../components/DesignSystemScreen";
import { DesignSystemSection } from "../components/DesignSystemSection";
import { ItwCredentialCard } from "../../itwallet/common/components/ItwCredentialCard";
import { CredentialType } from "../../itwallet/common/utils/itwMocksUtils";

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  }
});

const onPress = () => {
  Alert.alert("Alert", "Action triggered");
};

const expiredDate = new Date(new Date().getTime() - 10000 * 60 * 10 * 24 * 30);
const validDate = new Date(new Date().getTime() + 10000 * 60 * 10 * 24 * 30);

const cardsDataForCarousel: PaymentCardsCarouselProps = {
  cards: [
    {
      hpan: "9999",
      expireDate: validDate,
      brand: "maestro",
      onPress
    },
    {
      holderEmail: "test@test.it",
      expireDate: validDate,
      onPress
    },
    {
      holderPhone: "1234",
      onPress
    },
    {
      hpan: "9999",
      expireDate: validDate,
      brand: "",
      onPress
    },
    {
      hpan: "9999",
      expireDate: expiredDate,
      isExpired: true,
      brand: "maestro",
      onPress
    },
    {
      holderEmail: "test@test.it",
      expireDate: expiredDate,
      isExpired: true,
      onPress
    }
  ]
};

const featuredInstitutionsDataForCarousel: FeaturedInstitutionsCarouselProps = {
  institutions: [
    {
      id: "anInstitutionId1",
      name: "Motorizzazione",
      onPress
    },
    {
      id: "anInstitutionId2",
      name: "IO - L'app dei servizi pubblici",
      isNew: true,
      onPress
    },
    {
      id: "anInstitutionId3",
      name: "PCM - Dipartimento per le Politiche Giovanili e il Servizio Civile Universale",
      onPress
    }
  ]
};

const featuredServicesDataForCarousel: FeaturedServicesCarouselProps = {
  services: [
    {
      id: "aServiceId1a",
      name: "Service Name",
      onPress
    },
    {
      id: "aServiceId1b",
      name: "Service Name",
      organizationName: "Organization Name",
      isNew: true,
      onPress
    },
    {
      id: "aServiceId2a",
      name: "Service Name without org. name",
      onPress
    },
    {
      id: "aServiceId2b",
      name: "Service Name on two lines",
      organizationName: "Organization Name",
      isNew: true,
      onPress
    },
    {
      id: "aServiceId3a",
      name: "Verbose Service Name on three lines",
      onPress
    },
    {
      id: "aServiceId3b",
      name: "Verbose Service Name on three lines",
      organizationName: "Verbose Organization Name",
      isNew: true,
      onPress
    },
    {
      id: "aServiceId4a",
      name: "Very long Service Name that exceeds the space allowed",
      isNew: true,
      onPress
    },
    {
      id: "aServiceId4b",
      name: "Very long Service Name that exceeds the space allowed",
      organizationName: "Verbose Organization Name",
      onPress
    }
  ]
};

const PaymentCards = () => (
  <>
    <DesignSystemSection title="PaymentCard">
      <DSComponentViewerBox name="PaymentCard">
        <ScrollView
          horizontal={true}
          style={{ aspectRatio: 16 / 10, marginHorizontal: -24 }}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingVertical: 16
          }}
        >
          <PaymentCard brand="MASTERCARD" hpan="9900" expireDate={validDate} />
          <HSpacer size={16} />
          <PaymentCard
            holderEmail="anna_v********@**hoo.it"
            expireDate={validDate}
          />
          <HSpacer size={16} />
          <PaymentCard
            brand="MASTERCARD"
            hpan="9900"
            expireDate={expiredDate}
            isExpired={true}
          />
          <HSpacer size={16} />
          <PaymentCard
            holderEmail="anna_v********@**hoo.it"
            expireDate={expiredDate}
            isExpired={true}
          />
          <HSpacer size={16} />
          <PaymentCard isLoading />
        </ScrollView>
      </DSComponentViewerBox>
      <DSComponentViewerBox name="PaymentCardBig (Pre ITW)">
        <ScrollView
          horizontal={true}
          style={{ marginHorizontal: -24 }}
          contentContainerStyle={{ paddingHorizontal: 24 }}
        >
          <PaymentCardBig
            cardType={"PAGOBANCOMAT"}
            expirationDate={new Date()}
            holderName="A very very very long citizen name"
            abiCode="03069"
          />
          <HSpacer size={16} />
          <PaymentCardBig
            cardType={"PAYPAL"}
            holderEmail="userPaypalEmail@email.com"
          />
          <HSpacer size={16} />
          <PaymentCardBig
            cardType={"COBADGE"}
            holderName="Mario Rossi"
            abiCode="08509"
            expirationDate={new Date()}
            cardIcon="visa"
          />
          <HSpacer size={16} />
          <PaymentCardBig
            cardType={"COBADGE"}
            holderName="Mario Rossi"
            abiCode="08508"
            expirationDate={new Date()}
            cardIcon="visa"
          />
          <HSpacer size={16} />
          <PaymentCardBig
            cardType={"BANCOMATPAY"}
            holderName="Mario Rossi"
            phoneNumber="+39 1234567890"
          />
          <HSpacer size={16} />
          <PaymentCardBig isLoading={true} />
        </ScrollView>
      </DSComponentViewerBox>
    </DesignSystemSection>
    <DesignSystemSection title="PaymentCardSmall">
      <DSComponentViewerBox name="Credit card">
        <View style={styles.content}>
          <PaymentCardSmall hpan="9900" brand="maestro" onPress={onPress} />
          <HSpacer size={16} />
          <PaymentCardSmall
            hpan="9900"
            brand="maestro"
            expireDate={new Date(2021, 10)}
          />
        </View>
      </DSComponentViewerBox>
      <DSComponentViewerBox name="PagoBANCOMAT">
        <View style={styles.content}>
          <PaymentCardSmall
            brand="pagoBancomat"
            bankName="Intesa San Paolo"
            onPress={onPress}
          />
          <HSpacer size={16} />
          <PaymentCardSmall />
        </View>
      </DSComponentViewerBox>
      <DSComponentViewerBox name="PayPal">
        <View style={styles.content}>
          <PaymentCardSmall
            holderEmail="anna_v********@**hoo.it"
            onPress={onPress}
          />
          <HSpacer size={16} />
          <PaymentCardSmall
            holderEmail="anna_v********@**hoo.it"
            onPress={onPress}
            expireDate={new Date(2021, 10)}
          />
        </View>
      </DSComponentViewerBox>
      <DSComponentViewerBox name="Co-badge">
        <View style={styles.content}>
          <PaymentCardSmall
            bankName="Intesa San Paolo"
            brand="maestro"
            onPress={onPress}
          />
          <HSpacer size={16} />
          <PaymentCardSmall
            bankName="Intesa San Paolo"
            brand="maestro"
            onPress={onPress}
            expireDate={new Date(2021, 10)}
          />
        </View>
      </DSComponentViewerBox>
      <DSComponentViewerBox name="BANCOMAT Pay">
        <View style={styles.content}>
          <PaymentCardSmall
            holderName="Anna Verdi"
            holderPhone="+39 340 *** **62"
            onPress={onPress}
          />
          <HSpacer size={16} />
          <PaymentCardSmall
            holderName="Anna Verdi"
            holderPhone="+39 340 *** **62"
            onPress={onPress}
            expireDate={new Date(2021, 10)}
          />
        </View>
      </DSComponentViewerBox>
      <DSComponentViewerBox name="PaymentCardsCarousel">
        <PaymentCardsCarousel {...cardsDataForCarousel} />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="PaymentCardsCarouselSkeleton">
        <PaymentCardsCarouselSkeleton />
      </DSComponentViewerBox>
    </DesignSystemSection>
  </>
);

const BonusCards = () => (
  <>
    <DesignSystemSection title="IdPayCard">
      <IdPayCard
        name="18 app"
        amount={9999}
        avatarSource={{
          uri: "https://vtlogo.com/wp-content/uploads/2021/08/18app-vector-logo.png"
        }}
        expireDate={new Date()}
      />
    </DesignSystemSection>
    <DesignSystemSection title="CgnCard">
      <DSComponentViewerBox name="Under 31">
        <CgnCard expireDate={new Date(2023, 11, 2)} withEycaLogo={true} />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="Expired">
        <CgnCard withEycaLogo={true} />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="Over 31">
        <CgnCard expireDate={new Date(2023, 11, 2)} />
      </DSComponentViewerBox>
    </DesignSystemSection>
  </>
);

const ServicesCards = () => (
  <>
    <DesignSystemSection title="InstitutionCard">
      <DSComponentViewerBox name="InstitutionCardsCarousel">
        <FeaturedInstitutionsCarousel
          {...featuredInstitutionsDataForCarousel}
        />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="InstitutionCardsCarouselSkeleton">
        <FeaturedInstitutionsCarouselSkeleton />
      </DSComponentViewerBox>
    </DesignSystemSection>
    <DesignSystemSection title="ServiceCard">
      <DSComponentViewerBox name="ServiceCardsCarousel">
        <FeaturedServicesCarousel {...featuredServicesDataForCarousel} />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="ServiceCardsCarouselSkeleton">
        <FeaturedServicesCarouselSkeleton />
      </DSComponentViewerBox>
    </DesignSystemSection>
  </>
);

const ItwCards = () => (
  <>
    <DesignSystemSection title="eID">
      <DSComponentViewerBox name="Preview">
        <ItwCredentialCard
          credentialType={CredentialType.PID}
          isPreview={true}
        />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="Valid">
        <ItwCredentialCard
          credentialType={CredentialType.PID}
          data={["Anna Verdi", "RSGMRT80A41H501X"]}
        />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="Expired">
        <ItwCredentialCard
          credentialType={CredentialType.PID}
          data={["Anna Verdi", "RSGMRT80A41H501X"]}
          status="expired"
        />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="Pending">
        <ItwCredentialCard
          credentialType={CredentialType.PID}
          data={["Anna Verdi", "RSGMRT80A41H501X"]}
          status="pending"
        />
      </DSComponentViewerBox>
    </DesignSystemSection>
    <DesignSystemSection title="Driving License">
      <DSComponentViewerBox name="Preview">
        <ItwCredentialCard
          credentialType={CredentialType.DRIVING_LICENSE}
          isPreview={true}
        />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="Valid">
        <ItwCredentialCard
          credentialType={CredentialType.DRIVING_LICENSE}
          data={["Anna Verdi", "A - B"]}
        />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="Expired">
        <ItwCredentialCard
          credentialType={CredentialType.DRIVING_LICENSE}
          data={["Anna Verdi", "A - B"]}
          status="expired"
        />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="Expiring">
        <ItwCredentialCard
          credentialType={CredentialType.DRIVING_LICENSE}
          data={["Anna Verdi", "A - B"]}
          status="expiring"
        />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="Pending">
        <ItwCredentialCard
          credentialType={CredentialType.DRIVING_LICENSE}
          data={["Anna Verdi", "A - B"]}
          status="pending"
        />
      </DSComponentViewerBox>
    </DesignSystemSection>
    <DesignSystemSection title="Disability Card">
      <DSComponentViewerBox name="Preview">
        <ItwCredentialCard
          credentialType={CredentialType.EUROPEAN_DISABILITY_CARD}
          isPreview={true}
        />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="Valid">
        <ItwCredentialCard
          credentialType={CredentialType.EUROPEAN_DISABILITY_CARD}
          data={["Anna Verdi", "A - B"]}
        />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="Expired">
        <ItwCredentialCard
          credentialType={CredentialType.EUROPEAN_DISABILITY_CARD}
          data={["Anna Verdi", "1234567"]}
          status="expired"
        />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="Expiring">
        <ItwCredentialCard
          credentialType={CredentialType.EUROPEAN_DISABILITY_CARD}
          data={["Anna Verdi", "1234567"]}
          status="expiring"
        />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="Pending">
        <ItwCredentialCard
          credentialType={CredentialType.EUROPEAN_DISABILITY_CARD}
          data={["Anna Verdi", "1234567"]}
          status="pending"
        />
      </DSComponentViewerBox>
    </DesignSystemSection>
    <DesignSystemSection title="Health Insurance Card">
      <DSComponentViewerBox name="Preview">
        <ItwCredentialCard
          credentialType={CredentialType.EUROPEAN_HEALTH_INSURANCE_CARD}
          isPreview={true}
        />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="Valid">
        <ItwCredentialCard
          credentialType={CredentialType.EUROPEAN_HEALTH_INSURANCE_CARD}
          data={["Anna Verdi", "VRDNNA95C71C933I"]}
        />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="Expired">
        <ItwCredentialCard
          credentialType={CredentialType.EUROPEAN_HEALTH_INSURANCE_CARD}
          data={["Anna Verdi", "VRDNNA95C71C933I"]}
          status="expired"
        />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="Expiring">
        <ItwCredentialCard
          credentialType={CredentialType.EUROPEAN_HEALTH_INSURANCE_CARD}
          data={["Anna Verdi", "VRDNNA95C71C933I"]}
          status="expiring"
        />
      </DSComponentViewerBox>
      <DSComponentViewerBox name="Pending">
        <ItwCredentialCard
          credentialType={CredentialType.EUROPEAN_HEALTH_INSURANCE_CARD}
          data={["Anna Verdi", "VRDNNA95C71C933I"]}
          status="pending"
        />
      </DSComponentViewerBox>
    </DesignSystemSection>
  </>
);

// for testing reasons, abi codes can be found here:
// https://www.comuniecitta.it/elenco-banche-per-codice-abi
export const DSCards = () => {
  const [page, setPage] = React.useState(0);

  return (
    <DesignSystemScreen title={"Cards"} noMargin={true}>
      <TabNavigation
        tabAlignment="start"
        selectedIndex={page}
        onItemPress={setPage}
      >
        <TabItem label="Payments" accessibilityLabel="Payments" />
        <TabItem label="Bonus" accessibilityLabel="Bonus" />
        <TabItem label="Services" accessibilityLabel="Services" />
        <TabItem label="IT Wallet" accessibilityLabel="IT Wallet" />
      </TabNavigation>
      <VSpacer size={16} />
      <ContentWrapper>
        {page === 0 && <PaymentCards />}
        {page === 1 && <BonusCards />}
        {page === 2 && <ServicesCards />}
        {page === 3 && <ItwCards />}
      </ContentWrapper>
    </DesignSystemScreen>
  );
};
