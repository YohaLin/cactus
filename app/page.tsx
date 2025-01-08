"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import clsx from "clsx";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Home = () => {
  const [currentId, setCurrentId] = useState(1);
  const [direction, setDirection] = useState<"previous" | "next" | null>(null);
  const [isDetailShowed, setIsDetailShowed] = useState(false);
  const isFirstRender = useRef(true);

  const previousMemberId = () => {
    return currentMember?.previousId || 1;
  };

  const nextMemberId = () => {
    return currentMember?.nextId || 1;
  };

  const handlePrevious = () => {
    // 第一次渲染不產生動畫
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    const newId = previousMemberId();
    setDirection("previous");
    setCurrentId(newId);
  };

  const currentMember = $findMember(currentId);
  const previousOneMember = $findMember(previousMemberId());
  const previousTwoMember = $findMember(previousOneMember?.previousId || 0);
  const nextOneMember = $findMember(nextMemberId());
  const nextTwoMember = $findMember(nextOneMember?.nextId || 0);
  const nextThreeMember = $findMember(nextTwoMember?.nextId || 0);
  const nextFourMember = $findMember(nextThreeMember?.nextId || 0);

  const handleNext = () => {
    // 第一次渲染不產生動畫
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    const newId = nextMemberId();
    setDirection("next");
    setCurrentId(newId);
  };

  useEffect(() => {
    // 點擊上一位
    if (direction === "previous") {
      gsap.fromTo(
        ".currentMember",
        { x: "5%" },
        {
          x: "0",
          duration: 0.5,
          ease: "back.out",
        }
      );

      gsap.fromTo(
        ".slide",
        { x: "100%" },
        {
          x: "0%",
          duration: 1,
          ease: "circ.out",
        }
      );

      gsap.fromTo(
        ".nextOneMember",
        { clipPath: "inset(0 0 0 0)", x: "0" },
        {
          clipPath: "inset(0 100% 0 0)",
          x: "-10%",
          duration: 1,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".mask",
        { x: "100%" },
        {
          x: "-100%",
          duration: 1,
          ease: "power2.out",
        }
      );
    }

    // 點擊下一位
    if (direction === "next") {
      gsap.fromTo(
        ".currentMember",
        { x: "-5%" },
        {
          x: "0",
          duration: 0.5,
          ease: "back.out",
        }
      );

      gsap.fromTo(
        ".slide",
        { x: "-100%" },
        {
          x: "0%",
          duration: 1,
          ease: "circ.out",
        }
      );

      gsap.fromTo(
        ".previousOneMember",
        { clipPath: "inset(0 0 0 0)", x: "0" },
        {
          clipPath: "inset(0 0 0 100%)",
          x: "10%",
          duration: 1,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".mask",
        { x: "-100%" },
        {
          x: "100%",
          duration: 1.5,
          ease: "power2.out",
        }
      );
    }
  }, [currentId, direction]);

  return (
    <div className="w-full h-full overflow-hidden">
      <h1 className="relative text-[120px] uppercase pl-3">Team Members</h1>

      {/* 詳細資訊 */}
      <div
        className={clsx(
          "absolute z-10 left-0 w-full h-[calc(100vh-9rem)] bg-[#1f1d1d] opacity-60"
        )}
      />
      <div
        className={clsx(
          "absolute z-20 left-0 w-full h-[calc(100vh-9rem)] bg-[#1f1d1d] text-xl detail-bg transform transition-all duration-300",
          {
            "opacity-1": isDetailShowed,
            "opacity-0": !isDetailShowed,
          }
        )}
      >
        <div
          className={clsx(
            "flex flex-col gap-2 w-[50%] pt-20 pl-[calc(100vw/6)] pr-20 detail transform transition-all duration-100 delay-200",
            {
              "opacity-1": isDetailShowed,
              "opacity-0": !isDetailShowed,
            }
          )}
        >
          <p className="whitespace-pre-line leading-10">
            {currentMember?.description}
          </p>
        </div>
      </div>

      {/* 幻燈片，圖片尺寸 4/3 */}
      <div className="relative grid grid-cols-6 gap-x-3 w-full h-[calc(100vw/3/3*4)] justify-between text-black text-[60px] overflow-hidden">
        {/* 左邊幻燈片的假圖 */}
        <Image
          src={nextFourMember?.avatar || ""}
          width={300}
          height={400}
          alt="avatar"
          className={clsx(
            "absolute top-0 -left-[16.666%] mt-40 w-1/6 aspect-[3/4] object-cover rounded-3xl slide"
          )}
        />
        <Image
          src={currentMember?.avatar || ""}
          width={300}
          height={400}
          alt="avatar"
          className={clsx(
            "absolute top-0 left-[calc(50%+6px)] mt-40 w-[calc(100%/6-10px)] aspect-[3/4] object-cover rounded-3xl slide"
          )}
        />
        {/* 右邊幻燈片的假圖 */}
        <Image
          src={currentMember?.avatar || ""}
          width={300}
          height={400}
          alt="avatar"
          className={clsx(
            "absolute top-0 left-[calc(66.666%-6px)] mt-40 w-1/6 aspect-[3/4] object-cover rounded-3xl slide"
          )}
        />
        <Image
          src={previousTwoMember?.avatar || ""}
          width={300}
          height={400}
          alt="avatar"
          className={clsx(
            "absolute top-0 -right-[calc(16.666%+6px)] mt-40 w-[calc(100%/6-10px)] aspect-[3/4] object-cover rounded-3xl slide"
          )}
        />

        {/* 左邊幻燈片 */}
        <Image
          src={nextThreeMember?.avatar || ""}
          width={300}
          height={400}
          alt="avatar"
          className={clsx(
            "w-full mt-40 aspect-[3/4] object-cover rounded-3xl slide"
          )}
        />
        <Image
          src={nextTwoMember?.avatar || ""}
          width={300}
          height={400}
          alt="avatar"
          className={clsx(
            "w-full mt-40 aspect-[3/4] object-cover rounded-3xl slide"
          )}
        />
        <Image
          src={nextOneMember?.avatar || ""}
          width={300}
          height={400}
          alt="avatar"
          className={clsx(
            "w-full mt-40 aspect-[3/4] object-cover rounded-3xl slide"
          )}
        />

        {/* 選中的幻燈片 */}
        <div className="relative flex col-span-2">
          <div
            className="absolute z-30 w-full h-[calc(100vw/3/3*4)] overflow-hidden group cursor-pointer"
            onClick={() => setIsDetailShowed((prev) => !prev)}
          >
            <div className="absolute top-0 left-0 z-20 w-full h-full overflow-hidden">
              {direction === "next" && (
                <Image
                  src={previousOneMember?.avatar || ""}
                  width={300}
                  height={400}
                  alt="avatar"
                  className={clsx(
                    "w-full h-full aspect-[3/4] object-cover rounded-3xl previousOneMember",
                    isFirstRender.current && "hidden"
                  )}
                />
              )}
              {direction === "previous" && (
                <Image
                  src={nextOneMember?.avatar || ""}
                  width={300}
                  height={400}
                  alt="avatar"
                  className={clsx(
                    "w-full h-full aspect-[3/4] object-cover rounded-3xl nextOneMember",
                    isFirstRender.current && "hidden"
                  )}
                />
              )}
              <div
                className={clsx(
                  "absolute top-0 z-10 w-full h-full bg-black mask",
                  isFirstRender.current && "hidden"
                )}
              ></div>
            </div>
            <Image
              src={currentMember?.avatar || ""}
              width={300}
              height={400}
              alt="avatar"
              className="w-full h-full aspect-[3/4] object-cover rounded-3xl transition-all group-hover:scale-105 currentMemberRef z-20"
            />
            <div className="absolute z-20 bottom-0 flex flex-col gap-1 pl-6 pb-6 w-full h-fit text-white">
              <div className="text-7xl font-bold">{currentMember?.name}</div>
              <div className="text-3xl">{currentMember?.title}</div>
            </div>
          </div>
          <button
            className={clsx(
              "absolute top-1/2 -left-40 p-2 border-8 text-white rounded-full flex items-center justify-center transition-all duration-300",
              {
                "translate-x-40 z-10": isDetailShowed,
                "translate-x-0 z-30": !isDetailShowed,
              }
            )}
            onClick={handlePrevious}
          >
            <ArrowLeftIcon className="size-28" />
          </button>
          <button
            className={clsx(
              "absolute top-1/2 -right-40 p-2 border-8 text-white rounded-full flex items-center justify-center transition-all duration-300",
              {
                "-translate-x-40 z-10": isDetailShowed,
                "translate-x-0 z-30": !isDetailShowed,
              }
            )}
            onClick={handleNext}
          >
            <ArrowRightIcon className="size-28" />
          </button>
        </div>

        {/* 右邊幻燈片 */}
        <Image
          src={previousOneMember?.avatar || ""}
          width={300}
          height={400}
          alt="avatar"
          className="-z-10 w-full mt-40 aspect-[3/4] object-cover rounded-3xl slide"
        />
      </div>
    </div>
  );
};

export default Home;

const $findMember = (memberId: number) =>
  membersList.find((member) => member.id === memberId);

type MemberType = {
  id: number;
  name: string;
  title: string;
  previousId: number;
  nextId: number;
  avatar: string;
  description?: string;
};

const membersList: MemberType[] = [
  {
    id: 1,
    name: "Landy",
    title: "Product",
    previousId: 9,
    nextId: 2,
    avatar: "/avatars/Landy.png",
    description: `嗨，我是 Landy，是個熱愛產品和世界的人，過去參與了多項不同產品開發和產品制定，包含 web、app、系統等開發，PM 經驗歷經傳產 3y +、軟體 3y +，這幾年都在新創，我非常喜歡新創的活力，也認為這是快速成長的地方，而公司、產品的生命週期都經歷過。
待過的產業有：傳產、資訊、軟體、教育、社群、非營利組織，接觸多項產品類型：2B、2C、ERP、網站、線上課程、LMS、課程系統、直播、交友、租屋、醫療、政府案、電商、線上／線下活動、展場、社群、AI、遊戲、漫畫、數據。
非常喜歡與人交流想法，如果你有想要完成的夢想，或是想交流合作歡迎跟我聯繫～`,
  },
  {
    id: 2,
    name: "Peter",
    title: "Engineer",
    previousId: 1,
    nextId: 3,
    avatar: "/avatars/Peter.png",
    description: `嗨！我是 Peter Chen，專注於遊戲開發和互動應用的開發者。 
過去幾年，我參與了超過二十個多樣化的專案，涵蓋遊戲、手機 APP、XR 技術以及 AI 應用，累積了豐富的開發經驗與跨領域知識。 
除了寫程式之外，我也涉足需求分析、專案管理、團隊建設，並與高層共同探討公司的技術策略與發展路線。
我很享受與不同領域的人交流，從技術到職涯成長話題，我相信在互動中我們都能有所收穫。 
我非常樂意與對遊戲開發、技術分享、或是職涯規劃有興趣的人交流，無論是一起討論創新想法，還是分享一些實際專案中的心得與經驗。
如果你覺得有什麼我們可以一起探討或合作的，隨時與我聯繫！`,
  },
  {
    id: 3,
    name: "Melo",
    title: "Engineer",
    previousId: 2,
    nextId: 4,
    avatar: "/avatars/Melo.png",
    description: `希望自己可以持續喜歡寫程式這件事，然後四處走走去認識這個世界以及更多的人 `,
  },
  {
    id: 4,
    name: "艾聿",
    title: "Engineer",
    previousId: 3,
    nextId: 5,
    avatar: "/avatars/Errol.png",
    description: `目標 : 做好玩的遊戲 
專業 : Unity工程師 
座右銘 : 夢裡什麼都有`,
  },
  {
    id: 5,
    name: "Yoha",
    title: "Engineer",
    previousId: 4,
    nextId: 6,
    avatar: "/avatars/Yoha.png",
    description: `大家好～
我是 Yoha，曾經是藥師，因為很喜歡畫面跟做作品，所以不小心踏入前端的世界。
本來想把自己的 MBTI 洗成 I 人，這樣我就可以在聚會的時候默默吃東西，不會被 cue，但重新測了兩次都是 ESFJ。
近期愛上做一些減脂的食物，像是高蛋白蛋糕或是一些米紙料理，因為當了工程師之後，不只眼壓一直往上升，體重也是。
很高興認識大家：Ｄ`,
  },
  {
    id: 6,
    name: "紅魚",
    title: "Influencer",
    previousId: 5,
    nextId: 7,
    avatar: "/avatars/紅魚.png",
    description: `不當第一，只當唯一`,
  },
  {
    id: 7,
    name: "Sandy",
    title: "Operator",
    previousId: 6,
    nextId: 8,
    avatar: "/avatars/Sandy.png",
  },
  {
    id: 8,
    name: "William",
    title: "Product",
    previousId: 7,
    nextId: 9,
    avatar: "/avatars/William.png",
  },
  {
    id: 9,
    name: "Henry",
    title: "Product",
    previousId: 8,
    nextId: 1,
    avatar: "/avatars/Henry.jpg",
    description: `- 喜歡: 討論思考、了解做決定的原由、了解學習是如何發生的、清楚的聽到對於團隊/產品的進展，我可以如何調整我的行事
- 不喜歡: 不確定如何安排時間的時候(i.e. 我會想要知道一件事是”需要”、”不需要但花時間這樣做會不錯”還是”不需要且最好花少一點時間在這塊”)
- 勤奮工作狂: 我確實讓我做的工作都是我喜歡、對自己生涯幫助大的，但我也喜歡看韓劇、看小說漫畫
- 變成美國人了: 我喜歡美國的大學教育系統，但是除此之外我喜歡生活在台灣，我會一點台語，中文正常閒話家常沒問題，在公事討論上專業詞彙有時中文會卡帶，停頓的時刻我腦袋都在努力查字典`,
  },
];
