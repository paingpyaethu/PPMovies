import {Reactotron} from './ReactotronClient';

const reactotron = Reactotron.configure({
  name: 'PPMovies',
  onConnect: () => {
    /** since this file gets hot reloaded, let's clear the past logs every time we connect */
    Reactotron.clear();
  },
});

reactotron.useReactNative({
  networking: {
    ignoreUrls: /symbolicate/,
  },
});

/**
 * Now that we've setup all our Reactotron configuration, let's connect!
 */
reactotron.connect();
