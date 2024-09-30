import { render, screen } from "@testing-library/react";

import Users from "../components/Users";
import useUsers from "../hooks/useUsers";

const mockedUseProduct = useUsers as jest.Mock<any>;

jest.mock("../hooks/useUsers");

describe("<Users />", () => {
  beforeEach(() => {
    mockedUseProduct.mockImplementation(() => ({ isLoading: true }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Fetches the correct query", () => {
    const { rerender } = render(<Users query="test-query" />);

    expect(useUsers).toHaveBeenCalledWith("test-query");

    rerender(<Users query="test-query-2" />);

    expect(useUsers).toHaveBeenCalledWith("test-query-2");
    expect(useUsers).toHaveBeenCalledTimes(2);
  });

  it("Displays loading indicator", () => {
    render(<Users query="" />);
    expect(screen.queryByRole("progressbar")).toBeVisible();
  });
  it("Displays error message", () => {
    mockedUseProduct.mockImplementation(() => ({
      isLoading: false,
      isError: true,
      error: { message: "Unable to fetch the product data" },
    }));
    render(<Users query="" />);

    expect(screen.queryByRole("progressbar")).toBeFalsy();
    expect(screen.getByText("Unable to fetch the product data")).toBeInTheDocument();
  });
  it("Displays data", () => {
    mockedUseProduct.mockImplementation(() => ({
      isLoading: false,
      data: {
        pages: [
          {
            total_count: 291874,
            incomplete_results: false,
            items: [
              {
                login: "john",
                id: 1668,
                avatar_url: "https://avatars.githubusercontent.com/u/1668?v=4",
              },
            ],
          },
        ],
      },
    }));
    render(<Users query="test" />);

    expect(screen.queryByRole("progressbar")).toBeFalsy();
    expect(screen.getByText("john")).toBeInTheDocument();
    expect(screen.getByAltText("john")).toBeInTheDocument();
  });
});
