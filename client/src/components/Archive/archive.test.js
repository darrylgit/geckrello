import { shallow, mount } from "enzyme";
import React from "react";
import Archive from "./archive.component";
import { Archive as UnconnectedArchive } from "./archive.component";
import Root from "../../Root";

it("renders Archive component", () => {
  expect(
    shallow(
      <Root>
        <Archive />
      </Root>
    )
  ).toMatchSnapshot();
});

describe("Archive functionality", () => {
  let wrapped;

  beforeEach(() => {
    wrapped = mount(
      <Root>
        <Archive />
      </Root>
    );
  });

  afterEach(() => {
    wrapped.unmount();
  });

  it("allows users to toggle between cards and lists", () => {
    const activeButton = ".archive-toggle__button--active";
    const inactiveButton = ".archive-toggle__button--inactive";
    const activeInitial = wrapped.find(activeButton).text();
    const inactiveInitial = wrapped.find(inactiveButton).text();

    // Both the inactive and active buttons should work. First the active:
    wrapped.find(activeButton).simulate("click");
    expect(wrapped.find(activeButton).text()).toEqual(inactiveInitial);
    wrapped.find(activeButton).simulate("click");
    expect(wrapped.find(activeButton).text()).toEqual(activeInitial);

    // Now the inactive:
    wrapped.find(inactiveButton).simulate("click");
    expect(wrapped.find(activeButton).text()).toEqual(inactiveInitial);
    wrapped.find(inactiveButton).simulate("click");
    expect(wrapped.find(activeButton).text()).toEqual(activeInitial);
  });

  it("displays only archived cards and lists", () => {
    // Each array: one archived, one not. Component should only display the archived ones.
    const cards = [
      { _id: "1", title: "Card 1", archived: true },
      { _id: "2", title: "Card 2", archived: false }
    ];
    const lists = [
      { _id: "1", title: "List 1", archived: true },
      { _id: "2", title: "List 2", archived: false }
    ];

    // We export the Archive component before it gets passed into connect()
    // This way, we can call instance() on the component without a Provider getting in the way
    const wrapped2 = shallow(
      <UnconnectedArchive cards={cards} lists={lists} />
    );

    expect(wrapped2.instance().archivedCardsArray().length).toEqual(1);
    expect(wrapped2.instance().archivedListsArray().length).toEqual(1);
  });
});
