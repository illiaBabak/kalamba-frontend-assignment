import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useUpdateFollow } from "api/mutations";
import { useGetCurrentUser } from "api/queries";
import FollowButton from "components/FollowButton";

jest.mock("api/mutations");
jest.mock("api/queries");

const mockedUseUpdateFollow = useUpdateFollow as jest.MockedFunction<typeof useUpdateFollow>;
const mockedUseGetCurrentUser = useGetCurrentUser as jest.MockedFunction<typeof useGetCurrentUser>;

describe("FollowButton", () => {
  test("follows another user when Follow button is clicked", () => {
    const mutate = jest.fn();

    mockedUseGetCurrentUser.mockReturnValue({
      data: {
        email: "john@example.com",
        token: "token",
        username: "john",
        bio: "",
        image: "",
      },
      isFetching: false,
    } as ReturnType<typeof useGetCurrentUser>);

    mockedUseUpdateFollow.mockReturnValue({
      mutate,
      isLoading: false,
    } as unknown as ReturnType<typeof useUpdateFollow>);

    const profile = {
      username: "alice",
      bio: "",
      image: "",
      following: false,
    };

    render(<FollowButton profile={profile} />);

    userEvent.click(
      screen.getByRole("button", {
        name: /follow alice/i,
      })
    );

    expect(mutate).toHaveBeenCalledTimes(1);
    expect(mutate).toHaveBeenCalledWith({
      username: "alice",
      following: false,
    });
  });
});
