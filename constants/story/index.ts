// 定義時間點資料結構
export type TimelinePoint = {
  id: number;
  date: string;
  title: string;
  image: string;
};

// 模擬時間點資料
export const timelineData: TimelinePoint[] = [
  {
    id: 1,
    date: "2022年7月",
    title: "公司在蘇黎世成立公司在蘇黎世成立公司在蘇黎世成立公司在蘇黎世成立",
    image: "/avatars/Sandy.png",
  },
  {
    id: 2,
    date: "2022年10月",
    title: "完成首輪種子資金募集",
    image: "/avatars/Sandy.png",
  },
  {
    id: 3,
    date: "2023年1月",
    title: "推出第一個移動應用原型",
    image: "/avatars/Sandy.png",
  },
  {
    id: 4,
    date: "2023年5月",
    title: "達成首個商業合作夥伴關係",
    image: "/avatars/Sandy.png",
  },
  {
    id: 5,
    date: "2023年12月",
    title: "用戶數量突破 10,000 人",
    image: "/avatars/Sandy.png",
  },
];
