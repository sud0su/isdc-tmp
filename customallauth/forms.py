from django import forms
from django.utils.translation import pgettext, ugettext, ugettext_lazy as _
from django.contrib.auth import get_user_model

class NewSingupForm(forms.Form):
    TITLE_CHOICES = (
        ('', ''),
        ('Mr', 'Mr'),
        ('Mrs', 'Mrs'),
        ('Ms', 'Ms'),
        ('Dr', 'Dr'),
        ('Prof', 'Prof')
    )
    title = forms.ChoiceField(
        label=_("Title"),
        widget=forms.Select(), choices=TITLE_CHOICES, required=True)

    first_name = forms.CharField(
        label=_("First Name"),
        widget=forms.TextInput(),
        required=True
    )
    last_name = forms.CharField(
        label=_("Last Name"),
        widget=forms.TextInput(),
        required=True
    )
    organization = forms.CharField(
        label=_("Organization"),
        widget=forms.TextInput(), required=True)

    org_acronym = forms.CharField(
        label=_("Organisation acronym"),
        widget=forms.TextInput(), required=True)


    position = forms.CharField(
        label=_("Function / Position"),
        widget=forms.TextInput(), required=False)

    def __init__(self, *args, **kwargs):
        super(NewSingupForm, self).__init__(*args, **kwargs)
        for myField in self.fields:
            self.fields['username'].widget.attrs.pop("autofocus", None)

            if myField == 'title':
                self.fields[myField].widget.attrs['class'] = 'isdc-select__native-control mdc-select__native-control'
                self.fields[myField].widget.attrs['placeholder'] = ''
            else:
                self.fields[myField].widget.attrs['class'] = 'isdc-text-field__input mdc-text-field__input'
                self.fields[myField].widget.attrs['id'] = 'id__'+myField
                self.fields[myField].widget.attrs['placeholder'] = ''
                
            
    class Meta:
        model = get_user_model()
        fields = ['title', 'first_name','last_name','organization','org_acronym','position']

    def signup(self, request, user):
        """
        Invoked at signup time to complete the signup of the user.
        """
        user.title = self.cleaned_data['title'].strip()
        user.first_name = self.cleaned_data['first_name'].strip()
        user.last_name = self.cleaned_data['last_name'].strip()
        user.organization = self.cleaned_data['organization'].strip()
        user.org_acronym = self.cleaned_data['org_acronym'].strip()
        user.position = self.cleaned_data['position'].strip()
        user.save()