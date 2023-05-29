(function (window, undefined) {

    var text = "Hello this is propact plugin testing!11";

    window.Asc.plugin.init = function () {
        var variant = 2;
        switch (variant) {
            case 0: {
                console.log("INSIDE THE CASE 0")
                // serialize command as text
                var sScript = "var oDocument = Api.GetDocument();";
                sScript += "oParagraph = Api.CreateParagraph();";
                sScript += "oParagraph.AddText('Hello world!');";
                sScript += "oDocument.InsertContent([oParagraph]);";
                this.info.recalculate = true;
                this.executeCommand("close", sScript);
                break;
            }
            case 1: {
                console.log("INSIDE THE CASE 1")
                // call command without external variables
                this.callCommand(function () {
                    var oDocument = Api.GetDocument();
                    var oParagraph = Api.CreateParagraph();
                    oParagraph.AddText("Hello this is propact plugin testing!11");
                    oDocument.InsertContent([oParagraph]);
                }, true);
                break;
            }
            case 2: {
                console.log("INSIDE THE CASE 3")
                var _info = window.Asc.plugin.info;
                console.log("_info",_info)
                // call command with external variables
                Asc.scope.text = text; // export variable to plugin scope
                this.callCommand(function () {
                    var oDocument = Api.GetDocument();
                    var oParagraph = Api.CreateParagraph();
                    oParagraph.AddText(Asc.scope.text); // or oParagraph.AddText(scope.text);
                    oDocument.InsertContent([oParagraph]);
                }, true);
                break;
            }
            default:
                break;
        }
    };

    window.Asc.plugin.button = function (id) {
    };

})(window, undefined);
