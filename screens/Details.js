import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import axios from "axios"
import { Card } from "react-native-elements";


export default class DetailsScreen extends Component {
     constructor(props) {
          super(props);
          this.state = {
               details: {},
               url: ` http://127.0.0.1:5000/star?name=${this.props.navigation.getParam("star_name")}`

          };
     }

     componentDidMount() {
          this.getDetails();
     }
     getDetails = () => {
          const { url } = this.state;
          axios
               .get(url)
               .then(response => {
                    this.setDetails(response.data.data);
               })
               .catch(error => {
                    Alert.alert(error.message);
               });
     };

     setDetails = planetDetails => {
          this.setState({
              details : planetDetails,
          })
          

     };

     render() {
          const { details, imagePath } = this.state;
          if (details.specifications) {
               return (
                    <View style={styles.container}>
                         <Card
                              title={details.name}
                              image={imagePath}
                              imageProps={{ resizeMode: "contain", width: "100%" }} >
                            <View>
                            <Text style={styles.cardItem} >{`Distance : ${details.distance}`}</Text>
                            <Text style={styles.cardItem} >{`Radius : ${details.radius}`}</Text>
                            <Text style={styles.cardItem} >{`Name : ${details.name}`}</Text>
                            <Text style={styles.cardItem} >{`Mass : ${details.mass}`}</Text>
                            <Text style={styles.cardItem} >{`Gravity : ${details.gravity}`}</Text>
                            </View>
                            <View style={[styles.cardItem, { flexDirection: "column" }]}>
                                <Text>  {details.specifications ? `specifications - `: ""  } </Text>
                                {details.specifications.map((item ,index) =>(
                                 <Text key={index.toString()} style={{ marginLeft: 50 }}> {item} </Text>   
                                ) ) }
                            </View>
                         </Card>
                    </View>
               );
          }
          return null;
     }
}

const styles = StyleSheet.create({
     container: {
          flex: 1
     },
     cardItem: {
          marginBottom: 10
     }
});