import * as React from 'react';
import { shallow } from 'enzyme';
import { Loading } from '../src';

describe('<Loading />', () => {
  it('renders without crashing', () => {
    shallow(<Loading />);
  });
});