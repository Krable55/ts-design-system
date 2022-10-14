import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Heading from '../src/heading';
import { HeadingType } from '../src/heading/types';

describe('<Heading />', () => {

    it('should render without blowing up', () => {
        shallow(<Heading>Heading</Heading>);
    });

    it('should render the appropiate html element via the as prop', () => {
        const headings: HeadingType[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        let matches = 0;

        headings.forEach((elem) => {
            const wrapper = shallow(<Heading as={elem}>Heading</Heading>);

            if (wrapper.find(elem).length === 1) {
                matches += 1;
            }
        });

        expect(matches).to.eql(headings.length);
    });
});
