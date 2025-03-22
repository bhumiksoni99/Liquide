import { ImageSourcePropType } from "react-native/types";

export interface Data {
  id: number;
  city: string;
  subText: string;
  image: ImageSourcePropType;
}

export const data: Data[] = [
  {
    id: 1,
    city: "Mumbai",
    subText: "The Gateway To Dream City",
    image: require("./assets/image.jpg"),
  },
  {
    id: 2,
    city: "Uttarakhand",
    subText: "Nestled in Nature",
    image: require("./assets/image2.jpg"),
  },
  {
    id: 3,
    city: "Maldives",
    subText: "Sunsets for the Soul",
    image: require("./assets/maldives.jpg"),
  },
  {
    id: 4,
    city: "Himachal Pradesh",
    subText: "Home away from home",
    image: require("./assets/himachal.jpg"),
  },
  {
    id: 5,
    city: "Thailand",
    subText: "Basking under divinity",
    image: require("./assets/thailand.jpg"),
  },
  {
    id: 6,
    city: "Kerala",
    subText: "A Taste of Seventh Heaven",
    image: require("./assets/kerala.jpg"),
  },
  {
    id: 7,
    city: "Seychelles",
    subText: "Inhale. Exhale. Repeat.",
    image: require("./assets/seychelles.jpg"),
  },
];
