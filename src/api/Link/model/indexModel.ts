export interface PaginationModel {
  current: number;
  size: number;
}

export interface FriendLinkModel {
  logo: string;

  siteName: string;

  msg: string;

  siteUrl: string;

  hasVerified: boolean;
}

export interface LinkModel {
  logo: string;

  siteName: string;

  siteUrl: string;
  msg: string;

}
