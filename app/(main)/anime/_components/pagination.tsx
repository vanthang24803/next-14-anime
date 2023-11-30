"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  handlePrevPage: () => void;
  handleNextPage: () => void;
  currentPage: number;
  totalPage: number;
}

export const Pagination = ({
  handleNextPage,
  handlePrevPage,
  currentPage,
  totalPage,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-center space-x-4 ">
      {currentPage == 1 ? (
        <Button size="icon" disabled>
          <ArrowLeft />
        </Button>
      ) : (
        <Button size="icon" onClick={handlePrevPage}>
          <ArrowLeft />
        </Button>
      )}
      <Button disabled variant="ghost" size="default">
        {currentPage}/{totalPage}
      </Button>
      {currentPage == totalPage ? (
        <Button disabled size="icon">
          <ArrowRight />
        </Button>
      ) : (
        <Button size="icon" onClick={handleNextPage}>
          <ArrowRight />
        </Button>
      )}
    </div>
  );
};
