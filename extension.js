const vscode = require('vscode');
const { apis } = require('./api')

function apiTypeToItemType(t) {
  switch (t) {
    case 'm':
      return vscode.CompletionItemKind.Module;
    case 'f':
      return vscode.CompletionItemKind.Class;
    case 'c':
      return vscode.CompletionItemKind.Class;
    default:
      return vscode.CompletionItemKind.Variable;
  }
}

function apiToItem(api, tfSeg, pos) {
  var item = new vscode.CompletionItem(api.name, apiTypeToItemType(api.type))
  item.insertText = api.name;
  item.documentation = api.doc;
  item.additionalTextEdits = [
    vscode.TextEdit.delete(new vscode.Range(pos.translate(0, -tfSeg.length), pos))
  ];
  return item;
}

function provideCompletionItems(document, position) {
  // find code
  var currentLine = document.lineAt(position.line);
  var currentCode = currentLine.text.substr(0, position.character);

  // split by '.'
  var currentCodeSegs = currentCode.split(':');

  // find 'tf'
  var tfSeg = null;
  for (var i = currentCodeSegs.length - 1; i >= 0; i--) {
    if (currentCodeSegs[i] == 'tf') {
      tfSeg = currentCodeSegs.slice(i).join('.')
    }
  }
  if (tfSeg == null) return [];

  // not find api
  var matchedApis = apis.filter(api => api.name.startsWith(tfSeg));
  var items = matchedApis.map(api => apiToItem(api, tfSeg, position));
  return items;
}

function resolveCompletionItem(item) {
  return item;
}

var tfCompletionProvider = {
  'provideCompletionItems': provideCompletionItems,
  'resolveCompletionItem': resolveCompletionItem
}

function activate(context) {
  context.subscriptions.push(vscode.languages.registerCompletionItemProvider('python', tfCompletionProvider, '.', ':'));
  console.log('tfcomplete registered')
}

function deactivate() {
}

exports.activate = activate;
exports.deactivate = deactivate;