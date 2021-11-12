export interface ISlider{
  id: number;
  title?:{
    first: string;
    second: string;
  };
  subtitle?: string;
  link?: string;
  image: string;
  order?: number;
  marginLeft?: number;
}

export const SliderData: ISlider[] = [
  {
    id:1,
    title: {
      first: 'Social',
      second: 'Soccer'
    },
    subtitle: '',
    link:'/',
    image:'assets/imgs/1.jpg'
  },
  {
    id:1,
    title: {
      first: 'Social',
      second: 'Soccer'
    },
    subtitle: '',
    link:'/',
    image:'assets/imgs/futbol.png'
  },
  {
    id:1,
    title: {
      first: 'Social',
      second: 'Soccer'
    },
    subtitle: '',
    link:'/',
    image:'assets/imgs/2.jpg'
  },
]
