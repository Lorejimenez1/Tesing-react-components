import React from 'react';
import {shallow, mount} from 'enzyme';

describe('<Game />', () => {
	it('Renders without crashing', () => {
		shallow(<Game />);
	});

	it('Can start new game', () => {
		const wrapper = shallow(<Game />);

		wrapper.setState({
			guesses: [1, 2,3,4],
			feedback: 'test feedback',
			correctAnswer: -1
		});
		wrapper.instance().restartGame();
		expect(wrapper.state('guesses')).toEqual([]);
		expect(wrapper.state('feedback')).toEqual('test feedback');
		expect(wrapper.state('correctAnswer')).toBeGeaterThanOrEqual(0);
		expect(wrapper.state('correctAnswer')).toBeLessThanOrEqual(100);
	});
	it('can make a guess', () => {
		const wrapper = shallow(<Game />);

		wrapper.setState({
			correctAnswer: 100
		});
 		wrapper.instance().makeGuess(25);
    expect(wrapper.state('guesses')).toEqual([25]);
    expect(wrapper.state('feedback')).toEqual('You\'re Ice Cold...');

    wrapper.instance().makeGuess(60);
    expect(wrapper.state('guesses')).toEqual([25, 60]);
    expect(wrapper.state('feedback')).toEqual('You\'re Cold...');

    wrapper.instance().makeGuess(80);
    expect(wrapper.state('guesses')).toEqual([25, 60, 80]);
    expect(wrapper.state('feedback')).toEqual('You\'re Warm.');

    wrapper.instance().makeGuess(95);
    expect(wrapper.state('guesses')).toEqual([25, 60, 80, 95]);
    expect(wrapper.state('feedback')).toEqual('You\'re Hot!');

    wrapper.instance().makeGuess(100);
    expect(wrapper.state('guesses')).toEqual([25, 60, 80, 95, 100]);
    expect(wrapper.state('feedback')).toEqual('You got it!');
  });

   it('Can generate aural updates', () => {
    const wrapper = shallow(<Game />);

    wrapper.setState({
      correctAnswer: 100
    });

    wrapper.instance().makeGuess(25);
    wrapper.instance().makeGuess(3);
    wrapper.instance().makeGuess(90);

    wrapper.instance().generateAuralUpdate();

    expect(wrapper.state('auralStatus')).toEqual('Here\'s the status of the game right now: You\'re Warm. You\'ve made 3 guesses. In order of most- to least-recent, they are: 90, 3, 25');

  	});

	});
