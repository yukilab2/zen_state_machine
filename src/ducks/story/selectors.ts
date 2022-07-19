import { TopState } from '../types';
import * as story from './index';

export const root: ({ story }: TopState) => story.types.RootT = ({ story }) => {
    return story.root;
};

export const rootSubStates: ({ story }: TopState) => story.types.SubStatesT = ({ story }) => {
    return story.rootSubStates;
};

export const statePaths: ({ story }: TopState) => story.types.PathsT = ({ story }) => {
    return story.statePaths;
};

export const progress: ({ story }: TopState) => any = ({ story }) => {
    return story.progress;
};

export const all: ({ story }: TopState) => any = ({ story }) => {
    return story;
};
