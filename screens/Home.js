import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  Flatlist
} from "react-native";
import axios from "axios"
import { ListItem } from "react-native-elements";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
     listData = [],
     url : " http://127.0.0.1:5000"
    };
  }

  componentDidMount() {
    this.getPlanets();
  }

  getPlanets = () => {
     const { url } = this.state;
     axios
     .get(url)
     .then( response =>{
         return this.setState({
          listData : response.data.data
         })
     })
     .catch(error => {
          Alert.alert(error.message);
        });  
  };

 
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, index }) => (
      <ListItem
      key = {index}
      title = { `Name : ${item.name}` }
      subtitle = { `Distance : ${item.distance_from_earth}`  }
      titleStyle = {styles.title}
      containerStyle = {styles.listContainer}
      bottomDivider
      chevron
      onPress = { ()=> this.props.navigation.navigate("details", {star_name : item.name} ) }
      />
     
  )
  render() {
    const { listData } = this.state;

    if (listData.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text>Loading....</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.upperContainer}>
          <Text style={styles.headerText}>stars World</Text>
        </View>
        <View style={styles.lowerContainer}>
            <Flatlist
            data={listData}
            renderItem = {this.renderItem}
            keyExtractor = {this.keyExtractor}
            />
         

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831"
  },
  upperContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#EEEEEE"
  },
  lowerContainer: {
    flex: 0.9
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyContainerText: {
    fontSize: 20
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00ADB5"
  },
  listContainer: {
    backgroundColor: "#393E46"
  }
})