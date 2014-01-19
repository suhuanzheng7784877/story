CKEDITOR.editorConfig = function(config) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';

	config.toolbar = 'myconf';

	config.toolbar_myconf = [
			{
				name : 'message',
				items : [ 'Source', 'NewPage', 'Preview' ]
			},
			{
				name : 'basicstyles',
				items : [ 'Bold', 'Italic', 'Strike', '-', 'RemoveFormat' ]
			},
			{
				name : 'clipboard',
				items : [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord',
						'-', 'Undo', 'Redo' ]
			},
			{
				name : 'editing',
				items : [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ]
			},
			{
				name : 'styles',
				items : [ 'Styles', 'Format' ]
			},
			{
				name : 'paragraph',
				items : [ 'NumberedList', 'BulletedList', '-', 'Outdent',
						'Indent', '-', 'Blockquote' ]
			},
			{
				name : 'insert',
				items : [ 'Image', 'Table', 'HorizontalRule', 'Smiley',
						'SpecialChar', 'PageBreak', 'Iframe' ]
			}, {
				name : 'links',
				items : [ 'Link', 'Unlink', 'Anchor' ]
			}, {
				name : 'tools',
				items : [ 'Maximize' ]
			} ];

	config.language = 'zh-cn';
	config.skin = 'office2003';

};