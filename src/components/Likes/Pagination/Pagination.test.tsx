import { render, screen } from "@testing-library/react";

import { Pagination } from "./Pagination";
import "jest-canvas-mock";

describe("Pagination", () => {
  it("should render correctly all buttons", () => {
    render(<Pagination currentPage={1} pageCount={5} />);

    const currentPageButton = screen.getByRole("button", {
      name: /1/i,
    });
    const previousPageButton = screen.getByRole("button", {
      name: /previous page/i,
    });
    const firstPageButton = screen.getByRole("button", {
      name: /first page/i,
    });
    const nextPageButton = screen.getByRole("button", {
      name: /next page/i,
    });
    const lastPageButton = screen.getByRole("button", {
      name: /last page/i,
    });

    expect(currentPageButton).toBeInTheDocument();
    expect(previousPageButton).toBeInTheDocument();
    expect(firstPageButton).toBeInTheDocument();
    expect(nextPageButton).toBeInTheDocument();
    expect(lastPageButton).toBeInTheDocument();
  });

  it("should render correctly when is only one page", () => {
    const currentPage = 1;
    const pageCount = 1;
    const nextPage = currentPage + 1;
    const previousPage = currentPage - 1;

    render(<Pagination currentPage={currentPage} pageCount={pageCount} />);

    const currentPageButton = screen.getByRole("button", {
      name: currentPage.toString(),
    });
    const previousPageButton = screen.queryByRole("button", {
      name: /previous page/i,
    });
    const nextPageButton = screen.queryByRole("button", {
      name: /next page/i,
    });
    const firstPageButton = screen.queryByRole("button", {
      name: /first page/i,
    });
    const lastPageButton = screen.queryByRole("button", {
      name: /last page/i,
    });
    const nextPageNumberButton = screen.queryByRole("button", {
      name: nextPage.toString(),
    });
    const previousPageNumberButton = screen.queryByRole("button", {
      name: previousPage.toString(),
    });

    expect(currentPageButton).toBeInTheDocument();
    expect(previousPageNumberButton).not.toBeInTheDocument();
    expect(nextPageNumberButton).not.toBeInTheDocument();
    expect(firstPageButton).toBeDisabled();
    expect(previousPageButton).toBeDisabled();
    expect(nextPageButton).toBeDisabled();
    expect(lastPageButton).toBeDisabled();
  });

  it("should render correctly when is first page and there are more pages", () => {
    const currentPage = 1;
    const pageCount = 5;
    const nextPage = currentPage + 1;
    const previousPage = currentPage - 1;

    render(<Pagination currentPage={currentPage} pageCount={pageCount} />);

    const currentPageButton = screen.getByRole("button", {
      name: currentPage.toString(),
    });
    const previousPageButton = screen.queryByRole("button", {
      name: /previous page/i,
    });
    const nextPageButton = screen.queryByRole("button", {
      name: /next page/i,
    });
    const firstPageButton = screen.queryByRole("button", {
      name: /first page/i,
    });
    const lastPageButton = screen.queryByRole("button", {
      name: /last page/i,
    });
    const nextPageNumberButton = screen.queryByRole("button", {
      name: nextPage.toString(),
    });
    const previousPageNumberButton = screen.queryByRole("button", {
      name: previousPage.toString(),
    });

    expect(currentPageButton).toBeInTheDocument();
    expect(previousPageNumberButton).not.toBeInTheDocument();
    expect(nextPageNumberButton).toBeInTheDocument();
    expect(firstPageButton).toBeDisabled();
    expect(previousPageButton).toBeDisabled();
    expect(nextPageButton).toBeEnabled();
    expect(lastPageButton).toBeEnabled();
  });

  it("should render correctly when is last page and there are more pages", () => {
    const currentPage = 5;
    const pageCount = 5;
    const nextPage = currentPage + 1;
    const previousPage = currentPage - 1;

    render(<Pagination currentPage={currentPage} pageCount={pageCount} />);

    const currentPageButton = screen.getByRole("button", {
      name: currentPage.toString(),
    });
    const previousPageButton = screen.queryByRole("button", {
      name: /previous page/i,
    });
    const nextPageButton = screen.queryByRole("button", {
      name: /next page/i,
    });
    const firstPageButton = screen.queryByRole("button", {
      name: /first page/i,
    });
    const lastPageButton = screen.queryByRole("button", {
      name: /last page/i,
    });
    const nextPageNumberButton = screen.queryByRole("button", {
      name: nextPage.toString(),
    });
    const previousPageNumberButton = screen.queryByRole("button", {
      name: previousPage.toString(),
    });

    expect(currentPageButton).toBeInTheDocument();
    expect(previousPageNumberButton).toBeInTheDocument();
    expect(nextPageNumberButton).not.toBeInTheDocument();
    expect(firstPageButton).toBeEnabled();
    expect(previousPageButton).toBeEnabled();
    expect(nextPageButton).toBeDisabled();
    expect(lastPageButton).toBeDisabled();
  });

  it("should render correctly when is middle page and there are more pages", () => {
    const currentPage = 3;
    const pageCount = 5;
    const nextPage = currentPage + 1;
    const previousPage = currentPage - 1;

    render(<Pagination currentPage={currentPage} pageCount={pageCount} />);

    const currentPageButton = screen.getByRole("button", {
      name: currentPage.toString(),
    });
    const previousPageButton = screen.queryByRole("button", {
      name: /previous page/i,
    });
    const nextPageButton = screen.queryByRole("button", {
      name: /next page/i,
    });
    const firstPageButton = screen.queryByRole("button", {
      name: /first page/i,
    });
    const lastPageButton = screen.queryByRole("button", {
      name: /last page/i,
    });
    const nextPageNumberButton = screen.queryByRole("button", {
      name: nextPage.toString(),
    });
    const previousPageNumberButton = screen.queryByRole("button", {
      name: previousPage.toString(),
    });

    expect(currentPageButton).toBeInTheDocument();
    expect(previousPageNumberButton).toBeInTheDocument();
    expect(nextPageNumberButton).toBeInTheDocument();
    expect(firstPageButton).toBeEnabled();
    expect(previousPageButton).toBeEnabled();
    expect(nextPageButton).toBeEnabled();
    expect(lastPageButton).toBeEnabled();
  });
});
