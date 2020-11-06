import React from 'react';
import { Container, Header, Content, Body } from 'native-base';
import { Title, Subtitle, Button, Icon, Segment,Left, Right } from 'native-base';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Font from 'expo-font';

import RecipeCardsShowcase from "./app/views/RecipeCardsShowcase";
import Data from "./data";//simulated data source

const BREAKFAST = 'Breakfast';
const LUNCH = 'Lunch';
const DINNER = 'Dinner';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentCategory: BREAKFAST};
    this.setCurrentCategory = this.setCurrentCategory.bind(this);
  }

  setCurrentCategory(view){
    this.setState({currentCategory: view});
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  render() {
    return (
      <Container>
        <Header hasSegment style={styles.header}>
          <Left>
            <Button transparent>
              <Image source={require('./assets/icons/icon.png')} style={styles.appicon} />
            </Button>
          </Left>
          <Body>
            <Title>Swipe Cook Prototype</Title>
            {/*<Subtitle></Subtitle>*/}
          </Body>
          <Right>
            {/*<Icon style={{ color: 'white' }} type="FontAwesome" name="th-list" />*/}
          </Right>
        </Header>
        <Segment style={styles.segment}>
          <Button
            first
            active={this.state.currentCategory === BREAKFAST}
            onPress={() => this.setCurrentCategory(BREAKFAST)}
            style={styles.segmentButton}>
            <Text style={styles.segmentText}>{BREAKFAST}</Text>
          </Button>
          <Button
            active={this.state.currentCategory === LUNCH}
            onPress={() => this.setCurrentCategory(LUNCH)}
            style={styles.segmentButton}>
            <Text style={styles.segmentText}>{LUNCH}</Text>
          </Button>
          <Button
            last
            active={this.state.currentCategory === DINNER}
            onPress={() => this.setCurrentCategory(DINNER)}
            style={styles.segmentButton}>
            <Text style={styles.segmentText}>{DINNER}</Text>
          </Button>
        </Segment>
        <Content padder style={{ marginTop: -7 }}>
          <RecipeCardsShowcase currentCategory={this.state.currentCategory} recipeList={Data.categories.find(cat => cat.text === this.state.currentCategory ).recipeList} />
        </Content>
      </Container>
    );
  };

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  segment: {
    backgroundColor: 'rgba(255, 120, 91, 0.6)',
    height: 50,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  segmentButton: {
    padding: 30,
    fontWeight: "800",
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5
  },
  segmentText: {
    fontSize: 16
  },
  header: {
    backgroundColor: 'rgba(255, 120, 91, 1.0)'
  },
  appicon: {
    height: 50,
    width: 45,
    borderRadius: 50
  }
});