(function (window, undefined) {

    var text = "Hello this is propact plugin testing!11";
    document.addEventListener('mousemove', function (e) {
        console.log("MOUSEMOVE", e)
    })
    window.Asc.plugin.init = function (e) {
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
                // var pos = getEditorPosition(e);
                // console.log("pos", pos)
                // window.Asc.plugin.executeMethod ("OnDropEvent", [{
                //     "type": "ondrop",
                //     "x" : pos.x,
                //     "y" : pos.y,
                //     "text" : "test text",
                //     "html" : "test html"
                // }]);

                // window.onmousemove = function (e) {
                //     console.log("onmousemove", e)
                //     // if (!isDragging)
                //     //     return;
                //     //
                //     // document.body.style.cursor = "copy";
                //     //
                //     // var pos = getEditorPosition(e);
                //     //
                //     // if (pos)
                //     // {
                //     //     oldSendPos = { x : pos.x, y : pos.y };
                //     //     sendToEditor({
                //     //         type : "onExternalPluginMessage",
                //     //         subType: "internalCommand",
                //     //         data : {
                //     //             type: "onbeforedrop",
                //     //             x : pos.x,
                //     //             y : pos.y
                //     //         }
                //     //     });
                //     // }
                // }

                window.Asc.plugin.executeMethod("GetSelectedText", [{Numbering: true}], function (data) {
                    console.log("GetSelectedTextDATA", data)
                });
                console.log("INSIDE THE CASE 3")
                var _info = window.Asc.plugin.info;
                console.log("_info", _info)
                console.log("_infoDATA", _info.data)
                console.log("_info.width", _info.width)
                console.log("_info.height", _info.height)
                console.log("_info.mmToPx * _info.width", _info.mmToPx * _info.width)
                console.log("_info.mmToPx * _info.height", _info.mmToPx * _info.height)
                // call command with external variables
                Asc.scope.text = text; // export variable to plugin scope
                this.callCommand(function () {
                    var oDocument = Api.GetDocument();
                    console.log("oDocument", oDocument)
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

    window.Asc.plugin.onExternalMouseUp = function()
    {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("mousemove", true, true, window, 1, 0, 0, 0, 0,
            false, false, false, false, 0, null);
        var pos = getEditorPosition(evt)
        console.log("pos MOUNSSE", pos)
        document.dispatchEvent(evt);
    };

    window.Asc.plugin.button = function (id) {
    };

    function getEditorPosition(e) {
        var editor = document.getElementById("id_viewer");
        console.log("editor", editor)
        var X = e.pageX;
        var Y = e.pageY;
        console.log(" e.pageX", e.pageX)
        console.log(" e.pageY", e.pageY)
        if (undefined === X)
            X = e.clientX;
        if (undefined === Y)
            Y = e.clientY;
        console.log(" e.clientX", e.clientX)
        console.log(" e.clientY", e.clientY)
        var jF = jQuery(editor);
        var off = jF.offset();
        console.log(" e.off", off)
        var x = off.left;
        var y = off.top;
        console.log(" e.left", off.left)
        console.log(" e.top", off.top)
        var r = x + jF.width();
        var b = y + jF.height();
        console.log(" e.r", r)
        console.log(" e.b", b)
        if (X >= x && X <= r && Y >= y && Y <= b) {
            return {x: X - x, y: Y - y};
        }

        return null;
    }


})(window, undefined);
