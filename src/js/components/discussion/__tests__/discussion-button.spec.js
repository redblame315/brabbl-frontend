import React from 'react';
import { render } from 'enzyme';
import { adminUser } from '../../__mocks__/app.mock';
import { DiscussionButton } from '../'

describe("Discussion Button", () => {
    test('hides the create button if the user lacks permissions', () => {
        const wrapper = render(<DiscussionButton/>);
        expect(wrapper.find('button')).toHaveLength(0)
    });
    
    test('shows the create button if the user is admin', () => {
        const wrapper = render(<DiscussionButton user={adminUser}/>);
        expect(wrapper.find('button')).toHaveLength(1)
    });    
})