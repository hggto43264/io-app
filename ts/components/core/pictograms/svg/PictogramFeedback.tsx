import React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";
import { SVGPictogramProps } from "../Pictogram";

const PictogramFeedback = ({ size, color, ...props }: SVGPictogramProps) => (
  <Svg width={size} height={size} viewBox="0 0 64 64" {...props}>
    <G clipPath="url(#a)">
      <G clipPath="url(#b)">
        <Path
          fill="#0B3EE3"
          fillRule="evenodd"
          d="M20.5176 40.1409c-.0003-.0003-.0006-.0004.3153-.4302.3147-.4282.3158-.4297.3159-.4297l.0038.0028.0136.0099c.0122.0089.0308.0224.0557.0403.0497.0359.1244.0893.223.1589.1971.139.4896.3424.8687.5976.7582.5105 1.8623 1.2284 3.2415 2.0548 2.7598 1.6536 6.6146 3.7376 10.9998 5.4647 8.8084 3.4691 19.5767 5.4296 27.9625-.1438l.5904.8883c-8.8496 5.8817-20.0712 3.7424-28.9438.2479-4.4552-1.7546-8.3638-3.8684-11.1571-5.5421-1.3974-.8373-2.5174-1.5654-3.2891-2.085-.3858-.2598-.6847-.4676-.8878-.6108a31.98028 31.98028 0 0 1-.2316-.165c-.0263-.019-.0463-.0335-.0599-.0434l-.0156-.0113-.0053-.0039Z"
          clipRule="evenodd"
        />
        <Path
          fill="#AAEEEF"
          d="M30.3118 10.7271c-2.5823-1.73966-6.4608-1.93295-8.9519-.0712l-1.9241 1.7599c-.6582.4985-2.3392 2.2788-2.805 2.9604l-4.7646 6.6234c.7595.2136 1.1257.6303 1.7333 1.2 1.4785 1.3734 1.3334 1.3333 1.5325 2.2666-.6379 1.2513.8608 1.5483-.5974 1.2939.8101 1.1293-1.6017 0-.6684 3.0724-.5873 1.1394-.4.4337-1.5291.5671.5873 1.0071.5468 3.3216 0 4.4-1.0042 1.3333-3.38228.2478-5.67089-.8-.59747-.2747-1.21519-1.1117-1.6-1.6l-3.02785 4.8085-.17215 14.3036 2.82532-1.0275 11.81767-4.3135 10.9266-16.3382-4.5468-2.5128-2.6127-2.0856-1.2557-2.8078.3241-1.1394 1.1848-1.7701 1.7215-.5494 2.3393-.1933 1.4481.8037 2.4607 1.0377 3.7064 2.0652 1.0632-3.9371c.8203-3.0418-.3746-6.2667-2.9772-8.0165h.0203ZM7.73963 48.2868c-.91139-2.1669-3.37215-3.0622-4.77975-3.3979l.08101-6.9382 1.21519-.3967c2.65317.6205 7.21012 2.3093 10.95692 6.8771l.1621 1.058-7.6456 2.7875.01013.0102Z"
        />
        <Path
          fill="#0B3EE3"
          fillRule="evenodd"
          d="M64.8886 16.5486c0 .0002-.0001.0004.5018.1807.502.1804.5018.1807.5017.1811l-.0004.001-.0011.0031-.0038.0104c-.0033.0088-.0079.0211-.0139.037a7.13563 7.13563 0 0 1-.0529.1355c-.0467.1167-.1165.2848-.211.4958-.189.4219-.4769 1.0161-.8759 1.7144-.7973 1.395-2.0435 3.2144-3.8391 4.9046-3.6112 3.3992-9.4145 6.2416-18.12 4.1345-3.3128-.8008-6.4079-2.2853-9.2239-4.1644l-.0002-.0001c-1.8793-1.2553-4.57-2.8953-7.091-3.8772-1.2626-.4918-2.4482-.8046-3.4494-.8387-.9974-.034-1.7437.2082-2.2388.7469-.8079.8813-1.0454 1.6695-1.0054 2.3495.041.6981.3796 1.3702.8884 1.9915 1.0258 1.2525 2.6038 2.1298 3.0622 2.3601.0149.0075.031.0155.0483.0242.5315.2666 2.1878 1.0973 3.5695 2.1298.708.529 1.3895 1.1438 1.7995 1.7974.4186.6673.6068 1.4791.0924 2.2449l-.8855-.5947c.1894-.282.1851-.6122-.1105-1.0833-.3042-.4849-.8588-1.0051-1.5344-1.5099-1.3038-.9743-2.8887-1.7695-3.4162-2.0342a15.72749 15.72749 0 0 1-.0419-.021c-.4935-.2479-2.2369-1.2068-3.4086-2.6375-.59-.7203-1.0691-1.6015-1.1281-2.6047-.06-1.0211.3202-2.0817 1.2843-3.1332l.0004-.0004c.7808-.8499 1.8838-1.1316 3.0607-1.0915 1.1731.04 2.4869.3993 3.8002.9108 2.6309 1.0248 5.3985 2.7165 7.2964 3.9842 2.7333 1.8239 5.7141 3.2489 8.8822 4.0147l.0002.0001c8.3171 2.0131 13.7594-.6941 17.1381-3.8745 1.6993-1.5995 2.8841-3.3274 3.6441-4.6572.3795-.6641.6519-1.2267.8285-1.6211.0882-.1971.1525-.3519.1942-.4561.0209-.0521.0361-.0916.0458-.1173a1.3943 1.3943 0 0 0 .0105-.0281l.0023-.0061.0003-.001Z"
          clipRule="evenodd"
        />
        <Path
          fill="#0073E6"
          d="M10.5899 35.7312c.9763 0 1.7064-.299 2.18-.895 1.1769-1.4824.151-4.1887.1055-4.3019l-.9059.3738c.242.628.7197 2.4436.0434 3.2916-.4054.5084-1.2162.6493-2.41576.4208-2.55435-.487-4.35583-2.7619-4.94943-4.6693-.28543-.9164-.26888-1.7216.04136-2.0527L3.98585 27.2c-.58119.6237-.68047 1.7387-.26888 3.0609.6784 2.1851 2.7529 4.7911 5.70229 5.3528.42193.0791.81074.1196 1.16864.1196l.002-.0021Z"
        />
        <Path
          fill="#0073E6"
          d="M11.6568 30.9334c1.6111 0 2.2968-.561 2.5777-1.1387.4213-.8667-.0228-1.9843-.6754-2.5241l-.6134.7739c.3139.2572.6216.8793.4151 1.3074-.2685.5545-1.5656.894-4.39929.1876-4.0709-1.0142-5.06436-3.8926-5.29361-5.5163-.10327-.7401.07642-1.4613.49363-1.9821.46471-.5799.97693-.6663 1.66264-.2783l.47297-.8688c-1.09466-.62-2.11909-.4365-2.88742.5187-.5907.7338-.84888 1.7397-.7043 2.7539.26437 1.8725 1.40034 5.1853 6.02683 6.3408 1.21445.3037 2.17275.426 2.92665.426h-.0021Z"
        />
        <Path
          fill="#00C5CA"
          fillRule="evenodd"
          d="M25.2897 29.8016c.1832.1234.2317.372.1082.5552l-8.5333 12.6667c-.1234.1832-.372.2317-.5552.1083-.1833-.1235-.2317-.3721-.1083-.5553l8.5333-12.6666c.1235-.1833.3721-.2317.5553-.1083ZM31.0131 13.646c.1955-.1029.4374-.0278.5403.1677 1.4255 2.7085.4295 5.4084-.434 6.5596-.1325.1768-.3832.2126-.56.08-.1767-.1325-.2125-.3832-.08-.56.7366-.9821 1.6072-3.3489.3661-5.707-.1029-.1955-.0279-.4374.1676-.5403Z"
          clipRule="evenodd"
        />
        <Path
          fill="#0B3EE3"
          d="M13.7537 27.9284c-.1911.0484-.3944.0716-.6099.0716l.002-.0021c-1.283 0-3.0235-.8356-5.51216-2.6287-1.47614-1.065-2.17355-2.7908-2.01089-4.9902.14843-2.031 1.64897-3.6789 3.48704-3.8326 1.29021-.1106 3.55651-.5461 5.55651 1.5874l-.5334.7991c-1.6-1.92-3.9625-1.7315-4.94382-1.3973-1.37245.1158-2.4948 1.3701-2.60867 2.9192-.13826 1.8563.40259 3.2348 1.60221 4.0999 2.59238 1.8689 4.34098 2.6561 5.35158 2.4077.3863-.0947.673-.3431.9027-.7829.2257-.4315-.1423-1.086-.3802-1.4375-1.124-1.6538-3.64-3.215-4.75269-3.2159-.05252 0-.10301.0042-.14949.0105l-.14437-.9808c.6134-.0985 1.45455.1619 2.32275.6191V21.2l.9028.5159c1.0461.6981 2.0308 1.6084 2.6058 2.4557.8113 1.1955.6852 2.01.4372 2.4835-.3599.684-.8723 1.1134-1.525 1.2733Z"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h64v64H0z" />
      </ClipPath>
      <ClipPath id="b">
        <Path
          fill="#fff"
          d="M0 0h64v42.6667H0z"
          transform="translate(1.86621 9.33334)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default PictogramFeedback;
