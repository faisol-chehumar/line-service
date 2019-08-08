interface IEnumMovieList {
  [index: number]: {
    thumbImg: string;
    title: string;
    url: string
  };
}

export default class Bot {
  public request(): IEnumMovieList {
    return [
      {
        thumbImg: "https://placeholder.com/100/100",
        title: "The Mist",
        url: "https://www.youtube.com",
      },
    ];
  }
}
