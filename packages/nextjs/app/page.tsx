"use client";

import type { NextPage } from "next";
// import { useAccount } from "wagmi";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Address } from "~~/components/scaffold-eth";
import { useState } from "react";

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();

  const youtubeVideos = [
    {
      url: "https://www.youtube.com/watch?v=30pa790tIIA&list=PLJz1HruEnenCXH7KW7wBCEBnBLOVkiqIi&index=2",
      title: "WTF is ETH.BUILD?",
    },
    {
      url: "https://www.youtube.com/watch?v=QJ010l-pBpE&list=PLJz1HruEnenCXH7KW7wBCEBnBLOVkiqIi&index=3",
      title: "Hash Function - ETH.BUILD",
    },
    {
      url: "https://www.youtube.com/watch?v=9LtBDy67Tho&list=PLJz1HruEnenCXH7KW7wBCEBnBLOVkiqIi&index=4",
      title: "Key Pair - ETH.BUILD",
    },
    {
      url: "https://www.youtube.com/watch?v=mhwSGYRmkEU&list=PLJz1HruEnenCXH7KW7wBCEBnBLOVkiqIi&index=4&pp=iAQB",
      title: "Sending and Receiving Value",
    },
    {
      url: "https://www.youtube.com/watch?v=-6aYBdnJ-nM&list=PLJz1HruEnenCXH7KW7wBCEBnBLOVkiqIi&index=12",
      title: "Smart Contracts - ETH.BUILD",
    },
  ];

  // Whitepaper as raw markdown string
  const whitePaperMarkdown = `## ETH GuangZhou 对于大湾区的 Buidlers 的意义

在地缘学上，广州有非常重要的地位，是**「粤港澳大湾区」**的核心城市之一，即连接香港，又联通深圳。

同时，有多所高校坐落在广州，例如中山大学、华南理工大学、华南农业大学、广州大学等等等等。

广州、深圳、香港高校都有大量 Web3 爱好者，也有区块链协会，但是 **目前较为零散，尚未被有效的组织在一起**。

因此，建立 ETH GuangZhou，将组织的核心设定为**「用户导向的有效生产」**，对于广州本地的甚至整个大湾区的 ETH Buidlers 的学习与交流，都意义重大。

## ETH GuangZhou 对于 ETH 的意义

虽然现在在中国不同的区域已经存在多个 \`ETH *\`，例如 ETH-BeiJing、ETH-HangZhou……但是，目前尚未有专注在**「用户导向的有效生产」**这个内核的 ETH 分区。

**什么是专注在「用户导向的有效生产」**？

聚焦在 Infra 和 Geek Idea 的 Hackathon 和活动已经够多了，这些固然很好，但我们想看到的是 —— **Web3 技术是如何触达最终的 C 端用户的**。

因此，让我们 Hodl ETH-GuangZhou，Hodl 基于「用户导向的有效生产」的 Workshops、Hodl 基于「用户导向的有效产品」的 Hackathon，挖掘 ETH 的全新可能 🌹🌹🌹。`;

  // Simple function to convert markdown to HTML
  const convertMarkdownToHtml = (markdown: string) => {
    return markdown
      // Convert headers
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<center><h2 class="text-2xl font-bold mt-6 mb-4">$1</h2></center>')
      // Convert bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Convert code
      .replace(/`(.*?)`/g, '<code class="bg-gray-700 px-1 rounded">$1</code>')
      // Convert paragraphs
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.startsWith('<h1') || paragraph.startsWith('<h2')) {
          return paragraph;
        }
        return `<p class="my-3">${paragraph}</p>`;
      })
      .join('');
  };

  return (
    <>

      <div className="flex items-center flex-col grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            {/* TODO: add the LOGO here. */}
            {/* TODO: randome emoji here. */}
            <span className="text-2xl">We1c0me to <span className="text-4xl font-bold">&lt;% ETH GuangZhou %&gt;</span></span>
          </h1>
          {/* <div className="flex justify-center items-center space-x-2 flex-col">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div> */}
          <p className="text-center text-lg">
            * For the builders & all &quot;doers&quot;:
            <br></br><br></br>
            Let&rsquo;s buidl dApps that people actually use.
            <br></br><br></br>
            * 对开发者们：
            <br></br><br></br>
            共同构建「真有人用、真能落地」的酷应用。
            <br></br><br></br>
            * 对靓仔靓女：
            <br></br><br></br>
            一齐来做真係实用、够晒&quot;型&quot;嘅 dApps 啦！
          </p>
          <div className="flex justify-center mt-8">
            {/* Use DaisyUI modal-toggle pattern for the contact modal */}
            <label htmlFor="contact-modal" className="btn btn-ghost bg-white text-black hover:bg-gray-100 btn-lg cursor-pointer">
              Contact Us
            </label>
            <input type="checkbox" id="contact-modal" className="modal-toggle" />
            <label htmlFor="contact-modal" className="modal cursor-pointer">
              <label className="modal-box relative" htmlFor="">
                <label htmlFor="contact-modal" className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3">✕</label>
                <h3 className="text-xl font-bold mb-4 text-center">Contact Info</h3>
                <div className="space-y-4 text-center">
                  <div>
                    Telegram:<a href="https://t.me/leeduckgo" target="_blank" rel="noopener noreferrer" className="text-white-500 underline">https://t.me/leeduckgo</a>
                  </div>
                  <div>
                    Twitter: <a href="https://x.com/0xleeduckgo" target="_blank" rel="noopener noreferrer" className="text-white-500 underline">https://x.com/0xleeduckgo</a>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="mb-1">WeChat</span>
                    <img src="https://arweave.net/GAawdzc5Fn8BKaqqfJQDCeeYuhAe2ZMBMeG14sN_bq4" alt="WeChat QR" className="h-36 w-36 rounded-lg border" />
                  </div>
                </div>
              </label>
            </label>
          </div>
        </div>
        <div className="grow bg-base-300 w-full mt-16 px-8 py-12">
        <h2 className="text-4xl font-bold mb-6 text-center">TimeL1n3</h2>
        <div className="max-w-4xl mx-auto">
 
              <pre className="bg-base-300 p-4 rounded-lg overflow-x-auto">
                <code 
                  className="language-solidity"
                  dangerouslySetInnerHTML={{
                    __html: `
          +--------------+  
          |  2025-07-05  | 
          +--------------+  
          |<a href="/eth_summer" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors font-bold text-blue-400 underline">以太坊之夏·广州站</a>|
          +--------------+
          |  2025-07-30  | 
          +--------------+  
          |<a href="/eth_10_years" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors font-bold text-blue-400 underline">以太坊 0xA 周年</a> |
          +--------------+ 
                👆               Registration Starts       2025-08-21
        ------- ◉ -------------------- ◉ -------------------- ◉ -----------=>
   Online/Offline Workshops!      2025-07-01           ETH GuangZhou
`
                  }}
                />
              </pre>
          </div>
        </div>
        <div className="px-5 my-16">
          <h2 className="text-center mb-8">
            <span className="block text-4xl font-bold">Whitepaper</span>
          </h2>
          
          <div className="max-w-3xl mx-auto bg-base-200 p-8 rounded-xl">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(whitePaperMarkdown) }}
            />
          </div>
        </div>

        <div className="grow bg-base-300 w-full mt-16 px-8 py-12">
          <h2 className="text-center">
            <span className="block text-4xl font-bold">Worksh0ps</span>
          </h2>
          <br></br>
          <VideoSlideshow videos={youtubeVideos} />
        </div>

        <div className="px-5">
          <br></br>
          <h2 className="text-center">
            <span className="block text-4xl font-bold">Relāted Pr0jects</span>
          </h2>
          <br></br>
          <p>0x0000000000000000000000000000000000000000</p>
          {/* TODO: impl the related projects.*/}
        </div>

        <div className="px-5">
          <br></br>
          <h2 className="text-center">
            <span className="block text-4xl font-bold">Enterta1nm3nt</span>
          </h2>
          <br></br>
          <p>0x0000000000000000000000000000000000000000</p>
          {/* TODO: impl the entertainments.*/}
        </div>

        <div className="grow bg-base-300 w-full mt-16 px-8 py-12">
          <h2 className="text-center">
            <span className="block text-4xl font-bold">Sponsors</span>
          </h2>
          <div className="flex justify-center items-center gap-8 my-8">
            <a href="https://noncegeek.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://arweave.net/P1WVXIQB8Q6jlAAI5yejI40ujdn5_bzJoA-M5hpyCb8"
                alt="NonceGeekDAO"
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
            </a>
            {/* TODO: get more sponsors.*/}
          </div>
          
          <h2 className="text-center">
            <span className="block text-4xl font-bold">Partners</span>
          </h2>
          {/* https://arweave.net/COyOGEUi7q1JGfRe0TBUb7yzMU1Dn-R35scsOknI0PY */}
          {/* {https://arweave.net/hyK2rcOwD5UV7ECdbucbiZ3VJQqHOC4DUxG5qkGKtT4} */}
          <div className="flex justify-center items-center gap-8 my-8">
            <a href="https://noncegeek.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://arweave.net/P1WVXIQB8Q6jlAAI5yejI40ujdn5_bzJoA-M5hpyCb8"
                alt="NonceGeekDAO"
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
            </a>
            <a href="https://x.com/thuba_dao" target="_blank" rel="noopener noreferrer">
              <img
                src="https://arweave.net/RYn5bp_mLHQSe4ErEsxt8z2JEThrUR4PtaQHEvEORNA"
                alt="ThubaDAO"
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
            </a>
            <a href="https://x.com/opencas_ucas" target="_blank" rel="noopener noreferrer">
              <img
                src="https://arweave.net/hyK2rcOwD5UV7ECdbucbiZ3VJQqHOC4DUxG5qkGKtT4"
                alt="OpenCAS"
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
            </a>
            <a href="https://x.com/0xpantarhei" target="_blank" rel="noopener noreferrer">
              <img
                src="https://arweave.net/UsQncdEWCmOnDAA_1IANkW1wHFboJMXHjL5A35axGkM"
                alt="0xPantarhei"
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
            </a>
            <a href="https://hkba.club/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://arweave.net/zukl_MwwJPCbYWI77qBiyof62BUfGSD05JS71pooUWE"
                alt="HKBA"
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
            </a>
            <a href="https://x.com/scutba2025" target="_blank" rel="noopener noreferrer">
              <img
                src="https://arweave.net/53tMQCVjtXHarYlb_AhUK1VBJdJGDLSGElHMS9V20tY"
                alt="SCUTBA"
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
            </a>
            {/* TODO: get more partners.*/}
          </div>

        </div>

      </div>
    </>
  );
};

const VideoSlideshow = ({ videos }: { videos: { url: string; title: string }[] }) => {
  const [current, setCurrent] = useState(0);
  const videosPerPage = 3;
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const currentPage = Math.floor(current / videosPerPage);

  const prev = () => {
    setCurrent(() => {
      const newPage = (currentPage - 1 + totalPages) % totalPages;
      return newPage * videosPerPage;
    });
  };
  const next = () => {
    setCurrent(() => {
      const newPage = (currentPage + 1) % totalPages;
      return newPage * videosPerPage;
    });
  };

  // Get the videos to display on the current page
  const visibleVideos = videos.slice(currentPage * videosPerPage, currentPage * videosPerPage + videosPerPage);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-4">
        <button onClick={prev} className="btn btn-circle btn-outline">‹</button>
        <div className="flex gap-6">
          {visibleVideos.map((video, idx) => (
            <a
              key={idx}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-80 bg-base-100 rounded-xl shadow-lg p-4 hover:shadow-2xl transition"
            >
              <div className="aspect-video bg-black rounded-lg mb-2 flex items-center justify-center">
                <img
                  src={`https://img.youtube.com/vi/${video.url.split("v=")[1].split("&")[0]}/hqdefault.jpg`}
                  alt={video.title}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
              <div className="text-lg font-semibold text-center">{video.title}</div>
            </a>
          ))}
        </div>
        <button onClick={next} className="btn btn-circle btn-outline">›</button>
      </div>
      <div className="flex gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${idx === currentPage ? "bg-gray-300" : "bg-gray-500"}`}
            onClick={() => setCurrent(idx * videosPerPage)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
