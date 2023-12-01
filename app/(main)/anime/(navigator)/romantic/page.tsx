"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { AnimeModal } from "@/components/modal/anime-modal";
import { ModalLoading } from "@/components/modal/modal-loading";
import { Pagination } from "../../_components/pagination";

export default function RomanticCategory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [listAnime, setListAnime] = useState([]);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await axios.get(
          `/api/animes/category/romantic?page=${currentPage}`
        );
        console.log(response.data);
        setListAnime(response.data.items);
        setTotalPage(response.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnimes();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="pb-10">
        {listAnime.length != 0 ? (
          <AnimeModal animes={listAnime} title="LÃNG MẠN" />
        ) : (
          <ModalLoading />
        )}
      </div>
      <Pagination
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        totalPage={totalPage}
        currentPage={currentPage}
      />
    </div>
  );
}
