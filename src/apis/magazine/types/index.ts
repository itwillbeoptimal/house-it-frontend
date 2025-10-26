export interface MagazineListItem {
  magazineId: number;
  magazineCategoryId: number;
  magazineTitle: string;
  magazineSubtitle: string;
  magazineAuthor: string;
  authorProfileUrl: string;
  magazineThumbnailUrl: string;
  createdAt: string;
}

export interface MagazineListResponse {
  magazineListItems: MagazineListItem[];
  currentPage: number;
  hasNext: boolean;
}

export interface MagazineDetailResponse {
  magazineId: number;
  magazineCategoryId: number;
  magazineTitle: string;
  magazineSubtitle: string;
  magazineContent: string;
  magazineAuthor: string;
  authorProfileUrl: string;
  magazineThumbnailUrl: string;
  createdAt: string;
  isScrap: boolean | null;
}

export interface MagazineScrapResponse {
  magazineId: number;
  isScrapped: boolean;
}

export interface ScrapBoxItem {
  magazineId: number;
  magazineTitle: string;
  magazineSubtitle: string;
  magazineThumbnailUrl: string;
  createdAt: string;
}

export interface ScrapBoxResponse {
  scrapBoxItems: ScrapBoxItem[];
  hasNext: boolean;
  currentPage: number;
}

export interface RecommendedMagazineItem {
  magazineId: number;
  magazineTitle: string;
  magazineSubtitle: string;
  magazineThumbnailUrl: string;
  createdAt: string;
}

export interface RecommendedMagazineResponse {
  recommendedMagazineItems: RecommendedMagazineItem[];
}
