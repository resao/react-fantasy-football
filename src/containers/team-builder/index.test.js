import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { TeamBuilder } from "./";

configure({ adapter: new Adapter() });

describe("<TeamBuilder/>", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TeamBuilder onInitPlayers={() => {}} />);
  });

  it("should match snapshot when receiving players", () => {
    wrapper.setProps({
      players: {
        goalkeeper: 1,
        defender: 3,
        midfielder: 5,
        forward: 2,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
