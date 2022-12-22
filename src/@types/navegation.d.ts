interface RouteGameParams {
  title: string,
  bannerUrl: string,
  id: string
}

export declare global {
  namespace ReactNavegation {
    interface RootParamList {
      home: string;
      game: RouteGameParams
    }
  }
}