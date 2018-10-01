import React from 'react';
import {shallow, mount} from 'enzyme';

import GuessCount from './guess-count';

	descrribe('<GuessCount />', () => {
		it('Renders without crashing', () => {
			shallow(<GuessCount />);
		});

		it('Renders current guess count', () => {
    const value = 5;
    const wrapper = shallow(<GuessCount guessCount={value} />);
    expect(wrapper.text()).toEqual(`You've made ${value} guesses!`);
  });
});
	