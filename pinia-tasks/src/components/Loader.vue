<template>
    <div class="loader-container">
        <div class="loader loader--style2" title="1">
            <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="150px" height="150px"
                viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                <path fill="#000"
                    d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                    <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25"
                        to="360 25 25" dur="0.6s" repeatCount="indefinite" />
                </path>
            </svg>
        </div>
    </div>

</template>
<style scoped>
.loader-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loader {
    margin: 0 0 2em;
    height: 100px;
    width: 100%;
    text-align: center;
    padding: 1em;
    margin: 0 auto 1em;
    display: flex;
    justify-content: center;
    align-items: center;
}

svg path,
svg rect {
    fill: #FF6700;
}
</style>