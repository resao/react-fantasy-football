import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./";
import NavigationItem from "./item/";

configure({ adapter: new Adapter() });

describe("<NavigationItems/>", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it("should render correct <NavigationItem/> elements if not authenticated", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render correct <NavigationItem/> elements if authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper).toMatchSnapshot();
  });

  it("should include a logout link if authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
