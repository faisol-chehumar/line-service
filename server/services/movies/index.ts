import { request } from "../../utils/request";

interface IEnumMovieList {
  [index: number]: {
    thumbImg: string;
    title: string;
    url: string
  };
}

export default class Movies {
  private apiEndPoint: string;

  constructor(webService: string) {
    this.apiEndPoint = this.getApiEndPoint(webService);
  }

  public list(): IEnumMovieList {
    const movieList = request.fetchData(this.apiEndPoint);
    console.log(movieList);

    return [
      {
        thumbImg: "https://placeholder.com/100/100",
        title: "The Mist",
        url: "https://www.youtube.com",
      },
    ];
  }

  private getApiEndPoint(webService: string): string {
    if (webService === "imdb") {
      return "www.imdb.com";
    }

    return "not founded webservice api.";
  }
}
