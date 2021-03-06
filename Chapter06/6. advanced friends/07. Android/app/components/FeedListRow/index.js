import React, { Component } from 'react';
import {
  Platform,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import { getDateTimeString } from '../../utils/dateMethods';
import PostView from '../PostView';
import styles from './styles';

export default class FeedListRow extends Component {
  render () {
    return (
      <View style={ styles.container }>
        <TouchableHighlight
          onPress={ () => this._navigateToPostView() }
          underlayColor={ '#D3D3D3' }
        >
          <View>
            <Text style={ styles.created }>
              { this._renderCreatedString() }
            </Text>
              { this._renderStoryString() }
            <Text>
              { this._renderMessageString() }
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  _navigateToPostView () {
    const propsObject = {
      createdTime: this.props.createdTime,
      message: this.props.message,
      postID: this.props.postID,
      story: this.props.story
    };

    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        component: PostView,
        passProps: propsObject
      });
      return;
    }

    this.props.navigator.push({
      index: 2,
      passProps: propsObject
    });
  }

  _renderCreatedString () {
    return 'Posted ' + getDateTimeString(this.props.createdTime);
  }

  _renderMessageString () {
    return this.props.message
  }

  _renderStoryString () {
    if (this.props.story) {
      return (
        <Text style={ styles.story }>
          { this.props.story }
        </Text>
      )
    }
  }
}