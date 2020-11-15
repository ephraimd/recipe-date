import React from 'react';
import { Container, Header, Content, Toast, Root } from 'native-base';
import { Title, Body, Button, Icon, Segment, Left, Right } from 'native-base';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import * as Font from 'expo-font';

import RecipeCardsShowcase from "./app/views/RecipeCardsShowcase";
import Data from "./data";  //simulated data source

const BREAKFAST = 'Breakfast';
const LUNCH = 'Lunch';
const DINNER = 'Dinner';
let randomChoice = BREAKFAST;



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: BREAKFAST,
      randomnize: false
    };
    this.setCurrentCategory = this.setCurrentCategory.bind(this);
    this.randomnizeCategory = this.randomnizeCategory.bind(this);
    this.getCurrentRecipeList = this.getCurrentRecipeList.bind(this);
  }

  componentWillUnmount() {
    Toast.toastInstance = null;
  }

  setCurrentCategory(category) {
    this.setState({ currentCategory: category });
    this.setState({ randomnize: false });
  }

  randomnizeCategory(category) {
    this.setCurrentCategory(category);
    this.setState({ randomnize: true }); //also overrides the true set in the setCurrentCategory
  }

  getCurrentRecipeList() {
    let list = Data.categories.find((cat) => cat.text === this.state.currentCategory).recipeList;
    return this.state.randomnize === true ? list.sort(() => Math.random() - 0.5) : list;
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  render() {
    return (
      <Root>
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
              active={this.state.currentCategory === BREAKFAST}   //change state to breakfast
              onPress={() => this.setCurrentCategory(BREAKFAST)}   //open up object array for breakfast
              style={styles.segmentButton}>
              <Text style={styles.segmentText}>{BREAKFAST}</Text>
            </Button>



            <Button
              active={this.state.currentCategory === LUNCH}           //change state to Lunch
              onPress={() => this.setCurrentCategory(LUNCH)}         //open up object array for Lunch
              style={styles.segmentButton}>
              <Text style={styles.segmentText}>{LUNCH}</Text>
            </Button>


            <Button
              last
              active={this.state.currentCategory === DINNER}           //change state to Dinner
              onPress={() => this.setCurrentCategory(DINNER)}          //open up object array for Dinner
              style={styles.segmentButton}>
              <Text style={styles.segmentText}>{DINNER}</Text>
            </Button>

          </Segment>

          <Content padder style={{ marginTop: -7 }}>
            <RecipeCardsShowcase
              currentCategory={this.state.currentCategory}
              randomnize={this.state.randomnize}
              recipeList={this.getCurrentRecipeList()} />
          </Content>
        </Container>
        <Button rounded
              style={styles.randomFloatingButton}
              onPress={() => {
                this.randomnizeCategory(getRandomArbitrary());
                Toast.show({
                  text: "Category and cards shuffled!",
                  duration: 3000
                })
              }}
            >
              <Icon active type='FontAwesome' name='random' />
            </Button>
      </Root>
    );
  };

}


function getRandomArbitrary() {

  var max = 3;


  var randomC = Math.floor(Math.random() * Math.floor(max));

  if (randomC == 0)
    return 'Breakfast'
  if (randomC == 1)
    return 'Lunch'
  if (randomC == 2)
    return 'Dinner'


  return 'Lunch';
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  segment: {
    backgroundColor: 'rgba(255, 100, 91, 0.6)',
    height: 50,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  segmentButton: {
    padding: 15,
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
    backgroundColor: 'rgba(255, 90, 91, 1.0)'
  },
  appicon: {
    height: 50,
    width: 45,
    borderRadius: 50
  },
  randomFloatingButton: {
    padding: 15,
    position: 'absolute',
    top: Dimensions.get('window').height / 1.2,
    left: Dimensions.get('window').width / 1.4,
    backgroundColor: 'rgba(255, 100, 91, 0.6)',
    color: 'white'
  },
});