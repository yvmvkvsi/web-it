import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ResponsiveImage from "../../../src/components/ResponsiveImage";

describe("ResponsiveImage", () => {
  it("renders intrinsic dimensions and accessible alternative text", () => {
    render(
      <ResponsiveImage
        src="/media/example.jpg"
        alt="Example"
        width={1600}
        height={900}
      />,
    );

    const image = screen.getByRole("img", { name: "Example" });
    expect(image).toHaveAttribute("width", "1600");
    expect(image).toHaveAttribute("height", "900");
    expect(image).toHaveAttribute("loading", "lazy");
  });
});
