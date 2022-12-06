import React from 'react';
import { mount, shallow } from 'enzyme';
import { discussion, statement, customer, wording } from '../../__mocks__/app.mock';
import { Barometer } from '../'

describe("Barometer", () => {
    test('check calculateLineHeight method returns correct height ', () => {
        const wrapper = shallow(<Barometer discussion={discussion}
                                          statement={statement}
                                          customer={customer}
                                          wording={wording}
                                          discussion_status="DISCUSSION_STARTED"
                                          ratingAverage={0}
                                          ratingsTotal={4}/>,
                                          {disableLifecycleMethods: true});
        expect(wrapper.instance().calculateLineHeight(1, 5)).toBe(4);
        expect(wrapper.instance().calculateLineHeight(2, 5)).toBe(8);
        expect(wrapper.instance().calculateLineHeight(3, 5)).toBe(12);
        expect(wrapper.instance().calculateLineHeight(4, 5)).toBe(16);
        expect(wrapper.instance().calculateLineHeight(5, 5)).toBe(20);
        expect(wrapper.instance().calculateLineHeight(1,1)).toBe(10);
        expect(wrapper.instance().calculateLineHeight(1,3)).toBe(6);
        expect(wrapper.instance().calculateLineHeight(2,3)).toBe(13);
        expect(wrapper.instance().calculateLineHeight(3,3)).toBe(20);
    });
   
})