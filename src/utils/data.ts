
import manhaImg from "../assets/manha.png";
import manha1Img from "../assets/manha/manha-flower.png";

import shadowImg from "../assets/shadow.png";
import shadow1Img from "../assets/shadow/shadow-1.png";
import shadow2Img from "../assets/shadow/shadow-2.png";

import odyessyImg from "../assets/odyssey.png";
import od1Img from "../assets/odyssey/od-1.png";
import od2Img from "../assets/odyssey/od-2.png";

import mirageImg from "../assets/mirage.png";
import mirage1Img from "../assets/mirage/mirage-1.png";
import mirage2Img from "../assets/mirage/mirage-2.png";
import mirage4Img from "../assets/mirage/mirag-4.png";

export const productsData = {
  mirage: {
    name: "Mirage",
    images: [mirageImg, mirage1Img, mirage2Img, mirage4Img],
    subtitle: "Ethereal Desert Breeze",
    price: "Rs. 2500",
    description: "Mirage captures the essence of a hidden sanctuary. It's a scent that blurs the lines between reality and dream, offering a refreshing yet mysterious aura that evolves beautifully throughout the day.",
    notes: {
      top: "Pear Blossom",
      heart: "White Gardenia, Jasmine",
      base: "Brown sugar, Patchouli"
    }
  },
  manha: {
    name: "Manha",
    images: [manhaImg, manha1Img],
    subtitle: "Fresh Floral Elegance",
    price: "Rs. 4,500",
    description: "Manha is a delicate expression of femininity. It opens with bright, uplifting floral notes before settling into a soft, memorable embrace. Perfect for daytime wear and elegant evenings.",
    notes: {
      top: "Pear Blossom",
      heart: "White Gardenia, Jasmine",
      base: "Brown sugar, Patchouli"
    }
  },
  shadow: {
    name: "Shadow",
    images: [shadowImg, shadow1Img, shadow2Img],
    subtitle: "Dark Woody Mystery",
    price: "Rs. 5,200",
    description: "Shadow brings an alluring depth to your presence. Complex, woody, and intensely magnetic, it is crafted for those who leave a powerful, lingering impression.",
    notes: {
      top: "Spices, Cardamom, Black Pepper",
      heart: "Oud, Leather, Patchouli",
      base: "Amber, Vetiver, Dark Woods"
    }
  },
  odyessy: {
    name: "Odyessy",
    images: [odyessyImg, od1Img, od2Img],
    subtitle: "Bold Citrus Adventure",
    price: "Rs. 4,800",
    description: "A vibrant burst of energy. Odyessy combines zesty citrus with dynamic aromatic undertones, making it the perfect companion for the confident and the adventurous.",
    notes: {
      top: "Lemon, Grapefruit, Mint",
      heart: "Ginger, Nutmeg, Pink Pepper",
      base: "Cedarwood, Sandalwood, Moss"
    }
  }
};


export const products = [
  {
    id: 1,
    name: "manha",
    src : manha1Img,
    description: "fresh floral elegance"
  },
  {
    id: 2,
    name: "shadow",
    src : shadow1Img,
    description: "dark woody mystery"
  },
  {
    id: 3,
    name: "odyessy",
    src : od1Img,
    description: "bold citrus adventure"
  },
  {
    id: 4,
    name: "mirage",
    src : mirage1Img,
    description: "warm amber illusion"
  }
];
