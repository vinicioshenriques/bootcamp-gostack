import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { Keyboard, ActivityIndicator, ToastAndroid } from 'react-native';
import api from '../../services/api';

import {
    Container,
    Form,
    SubmitButton,
    Input,
    List,
    User,
    Avatar,
    Name,
    Bio,
    ProfileButton,
    ProfileButtonText,
} from './styles';

export default class Main extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        }).isRequired,
    };

    static navigationOptions = {
        title: 'Usuários',
    };

    state = {
        newUser: '',
        users: [],
        loading: false,
    };

    async componentDidMount() {
        const users = await AsyncStorage.getItem('users');

        if (users) {
            this.setState({ users: JSON.parse(users) });
        }
    }

    componentDidUpdate(_, prevState) {
        const { users } = this.state;
        if (prevState.users !== users) {
            AsyncStorage.setItem('users', JSON.stringify(users));
        }
    }

    handleAddUser = async () => {
        const { users, newUser } = this.state;

        this.setState({ loading: true });

        const userExists = users.filter(user => user.login === newUser);
        if (userExists.length > 0) {
            ToastAndroid.showWithGravityAndOffset(
                'Este usuário já foi adicionado',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                200
            );
        } else {
            await api
                .get(`/users/${newUser}`)
                .then(response => {
                    ToastAndroid.showWithGravityAndOffset(
                        'Usuário adicionado com sucesso!',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        200
                    );
                    const data = {
                        name: response.data.name,
                        login: response.data.login,
                        bio: response.data.bio,
                        avatar: response.data.avatar_url,
                    };
                    this.setState({
                        users: [...users, data],
                    });
                })
                .catch(err => {
                    ToastAndroid.showWithGravityAndOffset(
                        'Este usuário não existe!',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        200
                    );
                });
        }

        this.setState({
            newUser: '',
            loading: false,
        });

        Keyboard.dismiss();
    };

    handleNavigate = user => {
        const { navigation } = this.props;

        navigation.navigate('User', { user });
    };

    render() {
        const { users, newUser, loading } = this.state;
        return (
            <Container>
                <Form>
                    <Input
                        autocorrect={false}
                        autoCapitalize="none"
                        placeholder="Adicionar usuário"
                        value={newUser}
                        onChangeText={text => this.setState({ newUser: text })}
                        returnKeyType="send"
                        onSubmitEditing={this.handleAddUser}
                    />
                    <SubmitButton
                        loading={loading}
                        onPress={this.handleAddUser}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Icon name="add" size={20} color="#fff" />
                        )}
                    </SubmitButton>
                </Form>

                <List
                    data={users}
                    keyExtractor={user => user.login}
                    renderItem={({ item }) => (
                        <User>
                            <Avatar source={{ uri: item.avatar }} />
                            <Name>{item.name}</Name>
                            <Bio>{item.bio}</Bio>

                            <ProfileButton
                                onPress={() => this.handleNavigate(item)}
                            >
                                <ProfileButtonText>
                                    Ver perfil
                                </ProfileButtonText>
                            </ProfileButton>
                        </User>
                    )}
                />
            </Container>
        );
    }
}
