import React from 'react';
import { mount, render } from 'enzyme';
import App from '../app';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
const mockStore = configureStore([]);
import { initialState } from '../__mocks__/app.mock';

describe("App View", () => {
    test('renders the spinner if no discussion(s) could be fetched', () => {
        initialState.app.view = 'detail';
        initialState.app.loading = true;
        const store = mockStore(initialState); 
       
        const wrapper = render(
            <Provider store={store}>
                <App/>
            </Provider>);
        expect(wrapper.find('.fa-spinner')).toHaveLength(1)
    });
    
    test('renders the list-view if requested', () => {
        let state = { ...initialState };
        state.app = { ...state.app, view: 'list', loading: false };
        const store = mockStore(state); 
       
        const wrapper = render(
            <Provider store={store}>
                <App/>
            </Provider>);
        expect(wrapper.hasClass('discussion-list-widget')).toEqual(true)
    });    
})