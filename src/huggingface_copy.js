// ==UserScript==
// @name         get_huggingface_file_url
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  获取huggingface.co仓库中所有下载的url
// @author       --==RIX==--
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @match https://huggingface.co/*/*/tree/*
// @require      https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js
// @run-at document-end
// ==/UserScript==

(function() {
    'use strict';

    function copy_to_clipboard(matchedElements)
    {
        // 创建一个包含URL的数组
        var urlsToCopy = [];
        matchedElements.each(function() {
            var url = $(this).attr('href'); // 假设URL存储在href属性中
            urlsToCopy.push("https://huggingface.co/"+url);
        });

        // 将URL数组转换为文本
        var urlsText = urlsToCopy.join('\n'); // 每个URL之间使用换行符分隔

        // 创建一个文本区域元素并将文本添加到其中
        var textArea = document.createElement('textarea');
        textArea.value = urlsText;

        // 将文本区域元素添加到文档中
        document.body.appendChild(textArea);

        // 选中文本区域中的文本
        textArea.select();

        try {
            // 尝试执行复制操作
            var successful = document.execCommand('copy');
            var message = successful ? 'URL已复制到剪贴板' : '复制失败';
            alert(message);
        } catch (err) {
            alert('复制失败：'+ err);
        }

        // 删除文本区域元素
        document.body.removeChild(textArea);
    }



    // 创建按钮元素
    var button = document.createElement("button");
    button.textContent = "复制url"; // 按钮上的文本

    // 添加CSS样式
    button.style.position = "fixed";
    button.style.left = "50px"; // 调整左侧位置
    button.style.top = "50%"; // 垂直居中
    button.style.transform = "translateY(-50%)";
    button.style.backgroundColor = "#1a59b7"; // 设置背景颜色
    button.style.zIndex = "9999"; // 确保按钮在其他元素上面

    // 添加点击事件处理程序
    button.addEventListener("click", function() {
        // 在此处添加按钮点击时要执行的操作
        let all_url = $('ul > li > a[title="Download file"]');
        copy_to_clipboard(all_url);
    });

    // 将按钮添加到文档的body元素中
    document.body.appendChild(button);

})();
