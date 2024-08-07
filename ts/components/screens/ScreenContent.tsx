import * as React from "react";
import { ScrollView, StyleProp, ViewStyle } from "react-native";
import { IOStyles } from "@pagopa/io-app-design-system";
import { ScreenContentHeader } from "./ScreenContentHeader";

interface OwnProps {
  hideHeader?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  bounces?: boolean;
  contentRefreshControl?: React.ComponentProps<
    typeof ScrollView
  >["refreshControl"];
  referenceToContentScreen?: React.RefObject<ScrollView>;
}

type Props = OwnProps & React.ComponentProps<typeof ScreenContentHeader>;

/**
 * Wraps a BaseScreenComponent with a title and a subtitle
 */
class ScreenContent extends React.PureComponent<
  React.PropsWithChildren<Props>
> {
  public render() {
    const {
      title,
      rasterIcon,
      icon,
      subtitle,
      dark,
      hideHeader,
      contentStyle,
      bounces,
      referenceToContentScreen
    } = this.props;

    return (
      <ScrollView
        ref={referenceToContentScreen as unknown as React.LegacyRef<ScrollView>}
        style={[contentStyle, IOStyles.flex]}
        bounces={bounces}
        refreshControl={this.props.contentRefreshControl}
      >
        {!hideHeader && (
          <ScreenContentHeader
            rasterIcon={rasterIcon}
            icon={icon}
            title={title}
            subtitle={subtitle}
            dark={dark}
          />
        )}
        {this.props.children}
      </ScrollView>
    );
  }
}

export default ScreenContent;
