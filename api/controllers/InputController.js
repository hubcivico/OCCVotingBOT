/**
 * InputController
 *
 * @description :: Server-side logic for managing Inputs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  input: function (req, res) {
    var update = req.body;
    var userId = null;
    var userName = null;
    var userAlias = null;
    var text = null;
    var callback_query_id = null;
    if (update.callback_query) {
      userId = update.callback_query.from.id;
      userName = update.callback_query.from.first_name;
      userAlias = update.callback_query.from.username;
      text = update.callback_query.data;
      callback_query_id = update.callback_query.id;
    } else if(update.message){
      userId = update.message.from.id;
      userName = update.message.from.first_name;
      userAlias = update.message.from.username;
      text = update.message.text;
    }

    if (text && text.length > 200) {
      telegram.sendMessage(userId, strings.tell('troll', 'es'), "", true, null, {hide_keyboard: true});
      return res.ok();
    }

    var command = false;

    if (!update.callback_query) {
      if(update.edited_message){
        telegram.sendMessage(userId, strings.tell('troll', 'es'), "", true, null, {hide_keyboard: true});
        return res.ok();
      }else if(update.message){
        update.message.chat.chat_id = update.message.chat.id;
        update.message.from.user_id = update.message.from.id;
        delete update.message.chat.id;
        delete update.message.from.id;
        Update.create({update_id: update.update_id, message: update.message}, function (ko, ok) {
          if (ko) {
            sails.log.error("[DB] - InputController.js Updates.create error: ", ko);
          }
        });
      }
    }

    if (text) {
      command = commands.processIt(text);
    } else command = false;

    sails.log.debug("[DEV] - TEXT: " + text);
    stages.findOrCreateEntry({user_id: userId}, {user_id: userId, stage: 0}).then(
      function process(user) {
        var locale = user.locale;
        if (!user.banned) {
          sails.log.debug("[DEV] - InputController.js Stage: " + user.stage);
          sails.log.debug("[DEV] - InputController.js COMMANDTYPE: : : : : : "+ command.commandType);
          if (user.stage == 0) { //Language
            if (!command) {
              answers.answeringError(userId, locale);
            } else if (command.commandType == 1) {
              answers.answeringCommandsS0(command, userId, userName);
            } else if (command.commandType == 4) {
              answers.selectLanguage(command, userId, userName, callback_query_id);
            } else {
              answers.answeringError(userId, locale);
            }
          } else if (user.stage == 1) { //start
            if (!command) {
              aanswers.answeringError(userId, locale);
            } else if (command.commandType == 1) {
              answers.answeringCommandsS1(command, userId, userName, locale);
            } else if (command.commandType == 4) {
              answers.answeringRegisterS1(command, userId, callback_query_id, locale);
            } else {
              answers.answeringError(userId, locale);
              telegram.sendMessage(userId, strings.tell('help.1', locale));
            }


          } else if (user.stage == 2) { //Expecting NID
            if (!command) {
              answers.answeringError(userId, locale);
            } else if (command.commandType == 1) {
              answers.answeringCommandsS2(command, userId, userName, locale);
            } else if (command.commandType == 5 || command.commandType == 6) {
              answers.answeringRegisterS2(command, userId, callback_query_id, locale);
            } else {
              answers.answeringError(userId, locale);
              telegram.sendMessage(userId, strings.tell('help.2', locale));

            }

          } else if (user.stage == 3) { //Expecting Bdate
            if (!command) {
              answers.answeringError(userId, locale);
            } else if (command.commandType == 1) {
              answers.answeringCommandsS3(command, userId, userName, locale);
            } else if (command.commandType == 7) {
              answers.answeringRegisterS3(command, userId, callback_query_id, locale);
            } else {
              answers.answeringError(userId, locale);
              telegram.sendMessage(userId, strings.tell('help.3', locale));
            }

          } else if ((user.stage == 4) && user.valid) { //Ready To vote
            if (!command) {
              answers.answeringError(userId, locale);
            } else if (command.commandType == 1) {
              answers.answeringCommandsS4(command, userId, userName, locale);
            } else if (command.commandType == 8) {
              answers.answeringVote(command, userId, locale);
            } else {
              answers.answeringError(userId, locale);
              telegram.sendMessage(userId, strings.tell('help.4', locale));
            }

          } else if (user.stage == 5){ //Already voted
            if (!command) {
              answers.answeringError(userId, locale);
            } else if (command.commandType == 1) {
              answers.answeringCommandsS5(command, userId, userName, locale);
            } else if (command.commandType == 9) {
              answers.answerVerify(command, userId, locale);
            } else {
              answers.answeringError(userId, locale);
              telegram.sendMessage(userId, strings.tell('help.5', locale));
            }
          } else if (user.stage == 10){ //get_info
            if (!command) {
              answers.answeringError(userId, locale);
            } else if (command.commandType == 1) {
              answers.answeringCommandsS10(command, userId, userName, locale);
            } else if (command.commandType == 8) {
              answers.answeringGetInfo(command, userId, locale);
            }else if (command.commandType == 9) {
              answers.answerVerify(command, userId, locale);
            } else {
              answers.answeringError(userId, locale);
            }
          }

        } else {
          telegram.sendMessage(userId, strings.tell('register.banned', locale), "", true, null, {hide_keyboard: true});
          return res.ok();
        }
      }
    );
    return res.ok();
  }
};

