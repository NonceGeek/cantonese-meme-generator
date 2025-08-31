"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";

interface MemeItem {
  id: number;
  arweave_id: string;
  uploader: string;
  created_at: string;
}

// Component for handling image loading with fallback
const MemeImage = ({ arweaveId }: { arweaveId: string }) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="flex flex-col items-center justify-center h-40 bg-gray-100 text-gray-500">
        <svg className="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-sm">图片加载失败</p>
        <p className="text-xs text-gray-400 mt-1">ID: {arweaveId.substring(0, 8)}...</p>
      </div>
    );
  }

  return (
    <img
      src={`https://arweave.net/${arweaveId}`}
      alt={`Meme ${arweaveId}`}
      className="w-full h-auto object-cover"
      // loading="lazy"
      onError={() => setImageError(true)}
    />
  );
};

const Gallery: NextPage = () => {
  const [memes, setMemes] = useState<MemeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch memes from API
  useEffect(() => {
    const fetchMemes = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://dim-sum-prod.deno.dev/app/meme_pic_links");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: MemeItem[] = await response.json();
        setMemes(data);
      } catch (err) {
        console.error("Error fetching memes:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch memes");
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Truncate address function
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-[#e6e9ea] font-sans">
      {/* Header */}
      <header className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">梗圖模板展览馆</h1>
        <p className="text-gray-600 text-sm">搵到更多粤语梗图模板！</p>
        <Link
          href="/"
          className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          返回 Meme 制作页面
        </Link>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 pb-8">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">加载中...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">加载失败: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              重试
            </button>
          </div>
        )}

        {!loading && !error && memes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">暂无梗图模板</p>
          </div>
        )}

        {!loading && !error && memes.length > 0 && (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
            {memes.map(meme => (
              <div
                key={meme.arweave_id}
                className="break-inside-avoid bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/?ar_id=${meme.arweave_id}`}>
                  <MemeImage arweaveId={meme.arweave_id} />
                </Link>

                <div className="p-4">
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Arweave ID:</p>
                      <p className="font-mono text-sm text-gray-800 break-all">{meme.arweave_id}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">上传者:</p>
                      <p className="font-mono text-sm text-blue-600">{truncateAddress(meme.uploader)}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">上传时间:</p>
                      <p className="text-sm text-gray-700">{formatDate(meme.created_at)}</p>
                    </div>
                  </div>

                  <Link
                    href={`/?ar_id=${meme.arweave_id}`}
                    className="mt-3 block w-full text-center py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                  >
                    使用此模板
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
