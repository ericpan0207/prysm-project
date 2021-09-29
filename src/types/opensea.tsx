export interface Asset {
  image_url: string;
  image_preview_url: string;
  image_thumbnail_url: string;
  animation_url: string;
  permalink: string;
  owner: Owner;
}

export interface Owner {
  user: { username: string };
  profile_img_url: string;
  address: string;
}

export interface Assets {
  assets: Asset[];
}
