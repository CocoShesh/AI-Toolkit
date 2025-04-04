export interface formdata {
  prompt?: string;
  genre?: string;
  length?: string;
  pointOfView?: string;
  topic?: string;
  wordCount?: number;
  writingStyle?: string;
  userInput?: string;
  year?: string;
  source?: string;
  title?: string;
  style?: string;
  author?: string;
  tone?: string;
  count?: string;
  industry?: string;
  keywords?: string;
  outline?: string;
  name?: string;
  position?: string;
  company?: string;
  details?: string;
  jobTitle?: string;
  experience?: string;
  skills?: string;
  jobDescription?: string;
  questions?: string;
  currentSkills?: string;
  jobRequirements?: string;
  targetRole?: string;
  imageStyle?: string;
  imageSize?: string;
  dishName?: string;
  code?: string;
  concept?: string;
  companyName?: string;
  logoStyle?: string;
  colorScheme?: string;
  format?: string;
  description?: string;
  type?: string;
  number: number;
}

export type ParaphraseMode =
  | "standard"
  | "fluency"
  | "humanize"
  | "academic"
  | "simple";

export const fieldOptions = {
  users: [
    "id",
    "name",
    "email",
    "username",
    "avatar",
    "address",
    "phone",
    "website",
    "company",
    "bio",
  ],
  products: [
    "id",
    "name",
    "price",
    "description",
    "category",
    "image",
    "rating",
    "stock",
    "brand",
    "tags",
  ],
  transactions: [
    "id",
    "date",
    "amount",
    "currency",
    "status",
    "customer_id",
    "product_id",
    "payment_method",
    "reference",
    "notes",
  ],
};
