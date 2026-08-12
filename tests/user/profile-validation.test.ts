import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { User } from '../../src/models/userModel';
import { UserService } from '../../src/services/userService';

describe('Profil utilisateur', () => {
  let userService: UserService;
  let user: User;

  beforeEach(async () => {
    userService = new UserService();
    user = await userService.createUser({
      name: 'Test User',
      email: 'test@example.com',
    });
  });

  it('Création de profil', async () => {
    expect(user.name).to.equal('Test User');
    expect(user.email).to.equal('test@example.com');
  });

  it('Mise à jour de profil', async () => {
    const updatedUser = await userService.updateUser(user.id, {
      name: 'Updated Test User',
    });
    expect(updatedUser.name).to.equal('Updated Test User');
  });

  it('Suppression de profil', async () => {
    await userService.deleteUser(user.id);
    const deletedUser = await userService.getUserById(user.id);
    expect(deletedUser).to.be.null;
  });
});