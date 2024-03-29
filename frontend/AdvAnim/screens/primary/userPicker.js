import React, { Component } from 'react';
import {View, Text, FlatList, ActivityIndicator, AsyncStorage} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';

export class UserPicker extends Component {
  static navigationOptions = {
    title: 'Pick a User',
}
  constructor(props) {
      console.log("Running Constructor for userPicker.js");
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };
    

    this.arrayholder = [];
  }

  componentDidMount() {
      console.log("userPicker.js mounted");
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async() => {
    this.setState({ loading: true });
      const userToken = await AsyncStorage.getItem('@token');


      fetch("http://ec2-18-217-231-79.us-east-2.compute.amazonaws.com/users", {
          "method": "GET",
          "headers": {
              "token": userToken
          }
      })
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.response,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.response;
        console.log("Data fetched");
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );

  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.toUpperCase()} `;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
      console.log("Rendering Header");
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  render() {
      console.log("Rendering");
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              leftAvatar={{ source: { uri: "https://beaver-app-assets.oss-us-west-1.aliyuncs.com/assets/eggchat/ui/Artboard%201.png?x-oss-process=style/thumbnail-tiny" } }}
              title={`${item}`}
              subtitle={"EggChat User"}
              onPress = {()=>{
                this.props.navigation.getParam('callback')(item);
                this.props.navigation.goBack();
              }

              }
            />
          )}
          keyExtractor={item => item}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          
        />
      </View>
    );
  }
}