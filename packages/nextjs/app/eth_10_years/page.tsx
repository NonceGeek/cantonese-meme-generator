"use client";

import type { NextPage } from "next";
import { useState } from "react";

const EthTenYears: NextPage = () => {
  const [language, setLanguage] = useState<'zh' | 'en' | 'yue'>('zh');

  const content = {
    zh: {
      title: "怎样能 Buidl 实用型的 dApps？ | ETH 0xA 周年活动 · 广州",
      intro: "虽然现在在中国不同的区域已经存在多个 ETH *，例如 ETH-BeiJing、ETH-HangZhou……但是，目前尚未有专注在「用户导向的有效生产」这个内核的 ETH 分区。",
      question: "什么是专注在「用户导向的有效生产」？",
      answer: "—— 聚焦在 Infra 和 Geek Idea 的 Hackathon 和活动已经够多了，这些固然很好，但我们想看到的是： Web3 技术是如何触达最终的 C 端用户的。",
      description: "因此，让我们把本次活动的主题定义为「用户导向的有效生产」，探讨如何 Buidl 出实用型的 dApps。也许，在这种理念下创造出来的 Apps 并不能创造「金融奇迹」，带来百万市值的新鲜代币，然后拿到漂亮的 VC 融资。但是，会诞生这样的 ETH dApps ——",
      quote: "因为能满足用户的实际刚需，dApps 拥有 1000 个铁杆粉丝，平均每个粉丝愿意每年在 dApp 上花费 100 美元，那么，这个 dApp 每年能给其创作者带来 10 万美元的收益。",
      conclusion: "这正是凯文 · 凯利在 2008 的时候所描述的个体创造者的未来。同样的，我认为这也将是以太坊生态未来的一个重要方向。",
      eventTime: "活动时间：2025 年 7 月 30 日 14:00 - 18:00",
      location: "地点：待定",
      theme: "主题： 怎样能 Buidl 实用型的 dApps？ | ETH 0xA 周年活动 · 广州",
      agenda: "具体议程：",
      agendaItems: [
        "【分享】为什么我们需要 ETH-GuangZhou？",
        "【分享】凯文·凯利《1000 个铁杆粉丝 》文章解读，以及其对以太坊生态的意义",
        "【Workshop】Bodhi Protocol —— 一个实用型 ETH dApp 的例子",
        "【讨论】在实用型 dApp 的方向上，作为 Buidlers 有什么机会？",
        "【Mini Hackathon】【3 个奖项】 Let's Buidl 实用型 dApps！",
        "【预告】ETH GuangZhou Hackathon 预告"
      ],
      fee: "费用：完全免费！",
      register: "报名猛戳👉：",
      registerBtn: "我要报名！"
    },
    en: {
      title: "How to Buidl Practical dApps? | ETH 0xA Anniversary Event · Guangzhou",
      intro: "Although there are already multiple ETH * in different regions of China, such as ETH-Beijing, ETH-Hangzhou... there is currently no ETH division focused on the core of 'user-oriented effective production'.",
      question: "What does 'focusing on user-oriented effective production' mean?",
      answer: "—— There are already enough Hackathons and events focusing on Infra and Geek Ideas, which are certainly good, but what we want to see is: How Web3 technology reaches end users.",
      description: "Therefore, let's define the theme of this event as 'user-oriented effective production' and explore how to build practical dApps. Perhaps, Apps created under this concept may not create 'financial miracles', bring millions of market cap tokens, and get beautiful VC funding. But such ETH dApps will be born ——",
      quote: "Because they can meet users' actual needs, dApps have 1000 hardcore fans, and each fan is willing to spend $100 per year on the dApp, then this dApp can bring $100,000 in revenue to its creator annually.",
      conclusion: "This is exactly what Kevin Kelly described as the future of individual creators in 2008. Similarly, I believe this will also be an important direction for the Ethereum ecosystem in the future.",
      eventTime: "Event Time: July 30, 2025, 14:00 - 18:00",
      location: "Location: TBD",
      theme: "Theme: How to Buidl Practical dApps | ETH 0xA Anniversary Event · Guangzhou",
      agenda: "Agenda:",
      agendaItems: [
        "【Share】 Why do we need ETH-GuangZhou?",
        "【Share】 Kevin Kelly's '1000 True Fans' article interpretation and its significance for Ethereum ecosystem",
        "【Workshop】 Bodhi Protocol —— An example of practical ETH dApp",
        "【Discussion】 What opportunities do Builders have in the direction of practical dApps?",
        "【Mini Hackathon】【3 Awards】 Let's Build practical dApps!",
        "【Preview】 ETH GuangZhou Hackathon Preview"
      ],
      fee: "Fee: Completely Free!",
      register: "Register Now👉：",
      registerBtn: "Register!"
    },
    yue: {
      title: "点样可以 Buidl 实用型 dApps？ | ETH 0xA 周年活动 · 广州",
      intro: "虽然而家喺中国唔同嘅地区已经有好多个 ETH *，好似 ETH-BeiJing、ETH-HangZhou……但系，目前重未有专注喺「用户导向嘅有效生产」呢个内核嘅 ETH 分区。",
      question: "咩系专注喺「用户导向嘅有效生产」？",
      answer: "—— 聚焦喺 Infra 同 Geek Idea 嘅 Hackathon 同活动已经够多啦，呢啲固然好好，但系我哋想睇到嘅系： Web3 技术系点样触达最终嘅 C 端用户嘅。",
      description: "所以，等我哋将今次活动嘅主题定义为「用户导向嘅有效生产」，探讨点样 Buidl 出实用型嘅 dApps。可能，喺呢种理念下创造出嚟嘅 Apps 并唔能够创造「金融奇迹」，带嚟百万市值嘅新鲜代币，然后拎到靓嘅 VC 融资。但系，会诞生呢样嘅 ETH dApps ——",
      quote: "因为能够满足用户嘅实际刚需，dApps 拥有 1000 个铁杆粉丝，平均每个粉丝愿意每年喺 dApp 上面花费 100 美元，咁，呢个 dApp 每年能够俾其创作者带嚟 10 万美元嘅收益。",
      conclusion: "呢个正系凯文 · 凯利喺 2008 嘅时候所描述嘅个体创造者嘅未来。同样嘅，我认为呢个都将会系以太坊生态未来嘅一个重要方向。",
      eventTime: "活动时间：2025 年 7 月 30 日 14:00 - 18:00",
      location: "地点：待定",
      theme: "主题： 点样可以 Buidl 实用型 dApps？ | ETH 0xA 周年活动 · 广州",
      agenda: "具体议程：",
      agendaItems: [
        "【分享】点解我哋需要 ETH-GuangZhou？",
        "【分享】凯文·凯利《1000 个铁杆粉丝 》文章解读，以及其对以太坊生态嘅意义",
        "【Workshop】Bodhi Protocol —— 一个实用型 ETH dApp 嘅例子",
        "【讨论】喺实用型 dApp 嘅方向上面，作为 Buidlers 有咩机会？",
        "【Mini Hackathon】【3 个奖项】 Let's Buidl 实用型 dApps！",
        "【预告】ETH GuangZhou Hackathon 预告"
      ],
      fee: "费用：完全免费！",
      register: "报名猛戳👉：",
      registerBtn: "我要报名！"
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Title */}
        <h2 className="text-3xl font-bold text-center mb-8">
          {currentContent.title}
        </h2>
        
        {/* Language Support */}
        <div className="text-center text-lg mb-8">
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setLanguage('zh')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                language === 'zh' ? 'bg-primary text-white' : 'bg-base-200 hover:bg-base-300'
              }`}
            >
              普通话
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                language === 'en' ? 'bg-primary text-white' : 'bg-base-200 hover:bg-base-300'
              }`}
            >
              English
            </button>
            <button 
              onClick={() => setLanguage('yue')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                language === 'yue' ? 'bg-primary text-white' : 'bg-base-200 hover:bg-base-300'
              }`}
            >
              粤语
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            {currentContent.intro.split('ETH *').map((part, index) => (
              <span key={index}>
                {part}
                {index === 0 && <code className="bg-gray-200 px-1 rounded">ETH *</code>}
              </span>
            ))}
          </p>

          <p><strong>{currentContent.question}</strong></p>

          <p>
            {currentContent.answer.includes('Web3') ? (
              <>
                {currentContent.answer.split(/Web3[^。]*。?/)[0]}
                <strong>
                  {language === 'zh' ? 'Web3 技术是如何触达最终的 C 端用户的' : 
                   language === 'en' ? 'How Web3 technology reaches end users' : 
                   'Web3 技术系点样触达最终嘅 C 端用户嘅'}
                </strong>
                {currentContent.answer.split(/Web3[^。]*。?/)[1] || '。'}
              </>
            ) : (
              currentContent.answer
            )}
          </p>

          <p>
            {currentContent.description}
          </p>

          <blockquote className="border-l-4 border-primary pl-4 italic bg-base-200 p-4 rounded-r-lg">
            {currentContent.quote}
          </blockquote>

          <p>
            {language === 'zh' ? (
              <>
                这正是凯文 · 凯利
                <a href="https://36kr.com/p/1722823360513" target="_blank" rel="noopener noreferrer" className="text-white-600 underline hover:text-white-800 hover:no-underline transition-colors">
                  在 2008 的时候所描述的个体创造者的未来
                </a>
                。同样的，我认为这也将是以太坊生态未来的一个重要方向。
              </>
            ) : language === 'en' ? (
              <>
                This is exactly what 
                <a href="https://36kr.com/p/1722823360513" target="_blank" rel="noopener noreferrer" className="text-white-600 underline hover:text-white-800 hover:no-underline transition-colors">
                  Kevin Kelly described as the future of individual creators in 2008
                </a>
                . Similarly, I believe this will also be an important direction for the Ethereum ecosystem in the future.
              </>
            ) : (
              <>
                呢个正系凯文 · 凯利
                <a href="https://36kr.com/p/1722823360513" target="_blank" rel="noopener noreferrer" className="text-white-600 underline hover:text-white-800 hover:no-underline transition-colors">
                  喺 2008 嘅时候所描述嘅个体创造者嘅未来
                </a>
                。同样嘅，我认为呢个都将会系以太坊生态未来嘅一个重要方向。
              </>
            )}
          </p>

          {/* Event Details */}
          <div className="bg-base-200 p-6 rounded-lg mt-8">
            <p><strong>{currentContent.eventTime}</strong></p>
            <p><strong>{currentContent.location}</strong></p>
            <p><strong>{currentContent.theme}</strong></p>
          </div>

          {/* Agenda */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">{currentContent.agenda}</h2>
            <ol className="list-decimal list-inside space-y-2">
              {currentContent.agendaItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>

          {/* Registration */}
          <div className="bg-primary/10 p-6 rounded-lg mt-8 text-center">
            <p className="text-xl font-bold mb-4">{currentContent.fee}</p>
            <p className="mb-4">
              <strong>{currentContent.register}</strong>
              <a 
                href="https://dcnmea9aheb7.feishu.cn/share/base/form/shrcnXUXKrZJSKzVzSjTaVhccie" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary ml-2"
              >
                {currentContent.registerBtn}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthTenYears;